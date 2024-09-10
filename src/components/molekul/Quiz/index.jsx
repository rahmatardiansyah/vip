import { useEffect, useState } from 'react';
import quizData from '../../../data/quiz.js';
import { useLocation } from 'react-router-dom';
import { useQuiz } from '../../../context/QuizContext';
import { auth, db } from '../../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AlertInformation from '../../atoms/AlertInformation/index.jsx';
import UserInfo from '../UserInfo/index.jsx';

const Quiz = () => {
  const { state, dispatch } = useQuiz();
  const slug = useLocation().pathname.split('/')[1];
  const quizDataBySlug = state[slug];

  const [userDetails, setUserDetails] = useState(null);

  const [totalUnAnsweredQuestions, setTotalUnAnsweredQuestions] = useState(0);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, 'Users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());

            const quizRef = doc(db, 'Quiz', user.uid);
            const quizSnap = await getDoc(quizRef);

            const totalUserAnswered = Object.values(quizSnap.data()).reduce((total, obj) => {
              if (obj.questions) {
                total += obj.questions.length;
              }
              return total;
            }, 0);
            setTotalUnAnsweredQuestions(quizData.length - totalUserAnswered);

            if (quizSnap.exists()) {
              if (!quizSnap.data()[slug]) return;
              const getQuizQuestions = quizSnap.data()[slug].questions;
              dispatch({ type: 'SET_QUIZ_DATA', payload: getQuizQuestions, slug: slug });

              const userAnswers = quizSnap.data()[slug].userAnswers;
              userAnswers.forEach((ua) => {
                dispatch({ type: 'SET_USER_ANSWER', payload: ua, slug: slug });
              });

              const isQuizCompleted = quizSnap.data()[slug].isQuizCompleted;
              dispatch({ type: 'CONFIRM_USER_ANSWERS', payload: isQuizCompleted, slug: slug });
            }
          }
        } else {
          console.log('No user is logged in');
        }
      });
    };

    fetchUserData();
  }, [slug, dispatch]); // Run only when slug or dispatch changes

  // Initialize quiz data if not already set
  useEffect(() => {
    if (!quizDataBySlug) {
      const newData = quizData
        .filter((item) => item.slug === slug)
        .map((item) => {
          if (item.type === 'dynamic-input') {
            const { question, answer } = item.generateQuestion();
            return { question, answer, id: item.id, type: item.type, slug: item.slug };
          }
          return item;
        });

      dispatch({ type: 'SET_QUIZ_DATA', payload: newData, slug: slug });
      setTotalUnAnsweredQuestions(quizData.length);
    }
  }, [quizDataBySlug, slug, dispatch]); // Conditional rendering based on slug and quiz data

  // Send quiz data to Firebase when the quiz is completed
  useEffect(() => {
    if (quizDataBySlug?.isQuizCompleted) {
      const user = auth.currentUser;
      if (user) {
        try {
          const quizDataToSend = {
            [slug]: state[slug],
            totalScore: state.totalScore
          };
          setDoc(doc(db, 'Quiz', user.uid), quizDataToSend, { merge: true });

          console.log('Quiz answers successfully sent to Firebase');
        } catch (error) {
          console.error('Error sending quiz answers to Firebase: ', error);
        }
      }
    }
  }, [quizDataBySlug?.isQuizCompleted, slug, state, dispatch]); // Ensure this runs when quiz is completed

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleUserAnswer = (questionId, option) => {
    dispatch({
      type: 'SET_USER_ANSWER',
      payload: { id: questionId, answer: option },
      slug: slug
    });
  };

  const resetAnswers = () => {
    dispatch({ type: 'RESET_USER_ANSWERS', slug: slug });
  };

  const confirmUserAnswers = async () => {
    dispatch({ type: 'CONFIRM_USER_ANSWERS', payload: true, slug: slug });
  };

  if (!quizDataBySlug) {
    return <div>Loading quiz data...</div>;
  }

  const { questions, userAnswers, isQuizCompleted, score } = quizDataBySlug;

  return (
    <div className="px-4 max-w-screen-md mx-auto">
      {!userDetails && (
        <AlertInformation type="warning" title="Penyimpanan Data Quiz">
          {{
            main: ' Jawaban quiz akan disimpan di local storage jika Anda belum login. Jika login, data akan disimpan di database, memungkinkan sinkronisasi jawaban di semua perangkat Anda.',
            extra: (
              <a
                className="mt-4 px-3 py-2 bg-white text-black rounded shadow hover:bg-gray-100"
                href="/login"
              >
                Login Disini
              </a>
            )
          }}
        </AlertInformation>
      )}
      {userDetails && (
        <UserInfo
          userDetails={userDetails}
          handleLogout={handleLogout}
          totalUnAnsweredQuestions={totalUnAnsweredQuestions}
        />
      )}
      <div className="bg-white shadow border rounded p-4">
        <h3 className="text-2xl font-semibold mb-4">Quiz</h3>
        <div>
          {questions &&
            questions
              .filter((item) => item.type === 'multiple-choice')
              .map((q) => (
                <div key={q.id} className="border p-2 my-2">
                  <h4 className="my-4 text-xl">{q.question}</h4>

                  <ul className="flex flex-col">
                    {q.options.map((option, index) => (
                      <li
                        key={index}
                        className={`flex items-center p-4 border rounded my-2 ${userAnswers.find((ua) => ua.id === q.id && ua.answer === option) ? 'bg-blue-100 hover:bg-blue-100' : ''} ${isQuizCompleted ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}
`}
                        onClick={() => !isQuizCompleted && handleUserAnswer(q.id, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  {isQuizCompleted && (
                    <div className="mt-2 flex justify-center">
                      {userAnswers.find((ua) => ua.id === q.id && ua.answer === q.answer) ? (
                        <span className="text-green-500"> (Benar)</span>
                      ) : (
                        <span className="text-red-500"> (Salah)</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
          {['static-input', 'dynamic-input'].map((type) =>
            questions
              .filter((item) => item.type === type)
              .map((data) => (
                <div key={data.id} className="border p-2 my-2">
                  <h4 className="my-4 text-xl">{data.question}</h4>
                  <input
                    type="text"
                    className="border p-2 rounded w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                    value={userAnswers.find((ua) => ua.id === data.id)?.answer || ''}
                    onChange={(e) => !isQuizCompleted && handleUserAnswer(data.id, e.target.value)}
                    disabled={isQuizCompleted}
                  />
                  {isQuizCompleted && (
                    <div className="mt-2 flex justify-center">
                      {userAnswers.find((ua) => ua.id === data.id && ua.answer === data.answer) ? (
                        <span className="text-green-500"> (Benar)</span>
                      ) : (
                        <span className="text-red-500"> (Salah)</span>
                      )}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
        <div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={questions.length !== userAnswers.length}
            onClick={confirmUserAnswers}
          >
            Konfirmasi Jawaban
          </button>
          <button
            className="ml-2 mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded disabled:bg-red-300 disabled:cursor-not-allowed"
            disabled={userAnswers.length === 0}
            onClick={resetAnswers}
          >
            Reset Jawaban
          </button>
        </div>
        <div className="text-gray-500 mt-4">
          skor: {score} dari {questions.length}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
