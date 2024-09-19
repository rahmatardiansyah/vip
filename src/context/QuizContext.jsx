import { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {};

// Reducer function
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUIZ_DATA': {
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          questions: action.payload,
          userAnswers: [],
          isQuizCompleted: false,
          score: 0
        }
      };
    }
    case 'SET_USER_ANSWER': {
      // Cek apakah input dari user adalah string kosong
      if (action.payload.answer.trim() === '') {
        // Hapus entry dengan id yang sama dari userAnswers
        const filteredAnswers = state[action.slug].userAnswers.filter(
          (answer) => answer.id !== action.payload.id
        );

        return {
          ...state,
          [action.slug]: {
            ...state[action.slug],
            userAnswers: filteredAnswers
          }
        };
      }
      const updatedUserAnswers = state[action.slug].userAnswers.map((answer) =>
        answer.id === action.payload.id ? { ...answer, ...action.payload } : answer
      );

      const isExistingAnswer = state[action.slug].userAnswers.some(
        (answer) => answer.id === action.payload.id
      );

      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          userAnswers: isExistingAnswer
            ? updatedUserAnswers // Jika id sudah ada, timpa jawaban
            : [...state[action.slug].userAnswers, action.payload] // Jika belum ada, tambahkan jawaban baru
        }
      };
    }
    case 'CONFIRM_USER_ANSWERS': {
      const userAnswers = state[action.slug].userAnswers;
      const questions = state[action.slug].questions;

      // Hitung skor
      const score = questions.reduce((acc, question) => {
        const userAnswer = userAnswers.find((answer) => answer.id === question.id);
        if (userAnswer && userAnswer.answer.toLowerCase() === question.answer) {
          return acc + 1;
        }
        return acc;
      }, 0);

      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          isQuizCompleted: action.payload,
          score: score
        }
      };
    }
    case 'RESET_USER_ANSWERS': {
      return {
        ...state,
        [action.slug]: {
          ...state[action.slug],
          userAnswers: [],
          isQuizCompleted: false,
          score: 0
        }
      };
    }
    default:
      return state;
  }
};

// Create context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

// Custom hook to use the QuizContext
export const useQuiz = () => useContext(QuizContext);
