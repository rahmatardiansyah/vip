import { createContext, useReducer, useContext } from 'react';

// Initial state
const getInitialState = (slug) => {
  const quizData = JSON.parse(localStorage.getItem(`${slug}-data`)) || {};
  return {
    questions: quizData.questions || [],
    selectedAnswers: quizData.selectedAnswers || {}, // Load from local storage
    revealedAnswers: quizData.revealedAnswers || false, // Load from local storage
    results: quizData.results || { correct: 0, incorrect: 0 } // Load from local storage
  };
};

// Reducer function
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS': {
      const setQuestions = {
        slug: action.slug,
        questions: action.payload
      };
      localStorage.setItem(`${action.slug}-data`, JSON.stringify(setQuestions));
      return { ...state, questions: action.payload };
    }
    case 'SET_SELECTED_ANSWER': {
      const updatedAnswers = {
        ...state,
        selectedAnswers: {
          [action.payload.qId]: action.payload.answer
        }
      };
      localStorage.setItem(`${action.slug}-data`, JSON.stringify(updatedAnswers));
      return {
        ...state,
        selectedAnswers: { ...state.selectedAnswers, [action.payload.qId]: action.payload.answer }
      };
    }
    case 'SET_REVEALED_ANSWERS': {
      const revealedAnswers = {
        ...state,
        revealedAnswers: action.payload
      };
      localStorage.setItem(`${action.slug}-data`, JSON.stringify(revealedAnswers));
      return { ...state, revealedAnswers: action.payload };
    }
    case 'SET_RESULTS': {
      const result = {
        ...state,
        results: action.payload
      };
      localStorage.setItem(`${action.slug}-data`, JSON.stringify(result));
      return { ...state, results: action.payload };
    }
    case 'RESET_ANSWERS': {
      const allData = {
        ...state,
        questions: state.questions,
        selectedAnswers: {},
        revealedAnswers: false,
        results: { correct: 0, incorrect: 0 }
      };
      localStorage.setItem(`${action.slug}-data`, JSON.stringify(allData));
      return allData;
    }
    default:
      return state;
  }
};

// Create context
const QuizContext = createContext();

// Provider component
export const QuizProvider = ({ children, slug }) => {
  const [state, dispatch] = useReducer(quizReducer, getInitialState(slug));

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

// Custom hook to use the QuizContext
export const useQuiz = () => useContext(QuizContext);
