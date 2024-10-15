import { useEffect, useState } from 'react';
import quizData from '../../../data/quiz.js';
import { useLocation } from 'react-router-dom';
import { useQuiz } from '../../../context/QuizContext';
import { auth, db } from '../../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AlertInformation from '../../atoms/AlertInformation/index.jsx';
import UserInfo from '../UserInfo/index.jsx';
import { FaCheck } from 'react-icons/fa6';
import { MdOutlineClose } from 'react-icons/md';

const Quiz = () => {
  const { state, dispatch } = useQuiz();
  const slug = useLocation().pathname.split('/')[1];
  const quizDataBySlug = state[slug];

  const [userDetails, setUserDetails] = useState(null);
  const [UnAnsweredQuestion, setUnAnswerdQuestion] = useState(false);

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

            if (quizSnap.exists()) {
              const totalUserAnswered = Object.values(quizSnap.data()).reduce((total, obj) => {
                if (obj.questions) {
                  total += obj.userAnswers.length;
                }
                return total;
              }, 0);
              setTotalUnAnsweredQuestions(quizData.length - totalUserAnswered);
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
          const localData = localStorage.getItem(slug);
          if (localData) {
            const parsedData = JSON.parse(localData);
            dispatch({ type: 'SET_QUIZ_DATA', payload: parsedData.questions, slug: slug });

            const userAnswers = parsedData.userAnswers;
            userAnswers.forEach((ua) => {
              dispatch({ type: 'SET_USER_ANSWER', payload: ua, slug: slug });
            });
            dispatch({ type: 'CONFIRM_USER_ANSWERS', payload: true, slug: slug });
            setTotalUnAnsweredQuestions(quizData.length - parsedData.questions.length);
            setUserDetails(null);
          }
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
            return {
              question,
              answer,
              id: item.id,
              type: item.type,
              slug: item.slug,
              inputType: item.inputType
            };
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
            [slug]: state[slug]
          };
          setDoc(doc(db, 'Quiz', user.uid), quizDataToSend, { merge: true });

          console.log('Quiz answers successfully sent to Firebase');
        } catch (error) {
          console.error('Error sending quiz answers to Firebase: ', error);
        }
      }
    }
  }, [quizDataBySlug?.isQuizCompleted, slug, state]); // Ensure this runs when quiz is completed

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleUserAnswer = (questionId, option, valid) => {
    if (valid === false) {
      console.log('Invalid input');
      return;
    }
    dispatch({
      type: 'SET_USER_ANSWER',
      payload: { id: questionId, answer: option },
      slug: slug
    });
  };

  const resetAnswers = () => {
    dispatch({ type: 'RESET_USER_ANSWERS', slug: slug });

    const newData = quizData
      .filter((item) => item.slug === slug)
      .map((item) => {
        if (item.type === 'dynamic-input') {
          const { question, answer } = item.generateQuestion();
          return {
            question,
            answer,
            id: item.id,
            type: item.type,
            slug: item.slug,
            inputType: item.inputType
          };
        }
        return item;
      });

    if (userDetails) {
      const quizRef = doc(db, 'Quiz', auth.currentUser.uid);
      setDoc(
        quizRef,
        { [slug]: { questions: newData, userAnswers: [], isQuizCompleted: false, score: 0 } },
        { merge: true }
      );
    }
    dispatch({ type: 'SET_QUIZ_DATA', payload: newData, slug: slug });

    setTotalUnAnsweredQuestions(totalUnAnsweredQuestions + quizDataBySlug.questions.length);

    if (!userDetails) {
      localStorage.removeItem(slug);
    }
  };

  const confirmUserAnswers = () => {
    // cek apakah semua pertanyaan sudah dijawab
    if (quizDataBySlug.questions.length - quizDataBySlug.userAnswers.length > 0) {
      setUnAnswerdQuestion(true);
      console.log('Please answer all questions before confirming.');
      return;
    }
    setUnAnswerdQuestion(false);
    dispatch({ type: 'CONFIRM_USER_ANSWERS', payload: true, slug: slug });
    setTotalUnAnsweredQuestions(totalUnAnsweredQuestions - quizDataBySlug.questions.length);

    if (!userDetails) {
      console.log('User is not logged in. Saving user answers to local storage...');
      localStorage.setItem(slug, JSON.stringify(quizDataBySlug));
    }
  };

  if (!quizDataBySlug) {
    return <div>Kuis tidak ditemukan</div>;
  }

  const { questions, userAnswers, isQuizCompleted, score } = quizDataBySlug;

  // Definisikan urutan pertanyaan
  const typeOrder = ['multiple-choice', 'static-input', 'dynamic-input'];

  // Urutkan array berdasarkan urutan tipe
  questions.sort((a, b) => {
    const indexA = typeOrder.indexOf(a.type);
    const indexB = typeOrder.indexOf(b.type);

    // Jika tipe tidak ditemukan, beri prioritas lebih rendah
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

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
        <h3 className="text-2xl font-semibold mb-4">Kuis</h3>
        <div>
          {questions &&
            questions.map((questionItem, questionIndex) => {
              if (questionItem.type === 'multiple-choice') {
                return (
                  <div key={questionItem.id} className="border-2 p-2 my-2">
                    <h4 className="my-4 text-xl">
                      {`${questionIndex + 1}. `}
                      {questionItem.question}
                    </h4>
                    <ol className="flex flex-col">
                      {questionItem.options.map((option, index) => {
                        const alfabet = ['A', 'B', 'C', 'D', 'E'];
                        const classes = () => {
                          if (!isQuizCompleted) {
                            if (
                              userAnswers.find(
                                (ua) => ua.id === questionItem.id && ua.answer === option
                              )
                            ) {
                              return 'bg-blue-100 cursor-pointer';
                            }
                            return 'cursor-pointer sm:hover:bg-gray-100';
                          } else {
                            if (
                              userAnswers.find(
                                (ua) => ua.id === questionItem.id && ua.answer === option
                              ) &&
                              questionItem.answer !== option
                            ) {
                              return 'bg-red-200';
                            }
                            if (
                              userAnswers.find(
                                (ua) => ua.id === questionItem.id && ua.answer === option
                              ) &&
                              questionItem.answer === option
                            ) {
                              return 'bg-green-200';
                            }
                          }
                        };
                        return (
                          <li
                            key={index}
                            onClick={() =>
                              !isQuizCompleted && handleUserAnswer(questionItem.id, option)
                            }
                            className={`flex justify-between p-4 border rounded my-2 items-center ${classes()}`}
                          >
                            <span className="flex-grow">
                              {`${alfabet[index]}. `}
                              {option}
                            </span>
                            {isQuizCompleted &&
                              userAnswers.find(
                                (ua) => ua.id === questionItem.id && questionItem.answer === option
                              ) ? (
                              <FaCheck className="text-green-600 flex-shrink-0" />
                            ) : null}
                            {isQuizCompleted &&
                              userAnswers.find(
                                (ua) =>
                                  ua.id === questionItem.id &&
                                  ua.answer === option &&
                                  ua.answer !== questionItem.answer
                              ) ? (
                              <MdOutlineClose className="text-red-600 flex-shrink-0" />
                            ) : null}
                          </li>
                        );
                      })}
                    </ol>
                    {/* Show Alert Question not answerd */}
                    {!isQuizCompleted &&
                      UnAnsweredQuestion &&
                      !userAnswers.some((answer) => answer.id === questionItem.id) && (
                        <div className="mt-2 text-red-500">Pertanyaan diatas belum dijawab!</div>
                      )}
                  </div>
                );
              }

              if (questionItem.type === 'static-input') {
                return (
                  <div key={questionItem.id} className="border p-2 my-2">
                    <h4 className="my-4 text-xl">
                      {`${questionIndex + 1}. `}
                      {questionItem.question}
                    </h4>
                    <input
                      type="text"
                      className={`border p-2 rounded w-full ${!isQuizCompleted ? 'bg-white' : 'disabled:cursor-not-allowed'} ${isQuizCompleted && userAnswers.find((ua) => ua.id === questionItem.id && ua.answer.toLowerCase() === questionItem.answer) ? 'bg-green-200' : 'bg-red-200'}`}
                      value={userAnswers.find((ua) => ua.id === questionItem.id)?.answer || ''}
                      onChange={(e) =>
                        !isQuizCompleted &&
                        handleUserAnswer(questionItem.id, e.target.value, e.target.validity.valid)
                      }
                      disabled={isQuizCompleted}
                      pattern={questionItem.inputType === 'number' ? '[0-9]*' : undefined}
                      inputMode={questionItem.inputType === 'number' ? 'numeric' : undefined}
                    />
                    {isQuizCompleted &&
                      userAnswers.find(
                        (ua) =>
                          ua.id === questionItem.id &&
                          ua.answer.toLowerCase() !== questionItem.answer
                      ) && (
                        <div className="mt-2 text-red-500">
                          Jawaban yang benar: {questionItem.answer}
                        </div>
                      )}
                    {!isQuizCompleted &&
                      UnAnsweredQuestion &&
                      !userAnswers.some((answer) => answer.id === questionItem.id) && (
                        <div className="mt-2 text-red-500">Pertanyaan diatas belum dijawab!</div>
                      )}
                  </div>
                );
              }

              if (questionItem.type === 'dynamic-input') {
                return (
                  <div key={questionItem.id} className="border p-2 my-2">
                    <h4 className="my-4 text-xl">
                      {`${questionIndex + 1}. `}
                      {questionItem.question}
                    </h4>
                    <input
                      type="text"
                      className={`border p-2 rounded w-full ${!isQuizCompleted ? 'bg-white' : 'disabled:cursor-not-allowed'} ${isQuizCompleted && userAnswers.find((ua) => ua.id === questionItem.id && ua.answer.toLowerCase() === questionItem.answer) ? 'bg-green-200' : 'bg-red-200'}`}
                      value={userAnswers.find((ua) => ua.id === questionItem.id)?.answer || ''}
                      onChange={(e) =>
                        !isQuizCompleted &&
                        handleUserAnswer(questionItem.id, e.target.value, e.target.validity.valid)
                      }
                      disabled={isQuizCompleted}
                      pattern={questionItem.inputType === 'number' ? '[0-9]*' : undefined}
                      inputMode={questionItem.inputType === 'number' ? 'numeric' : undefined}
                    />
                    {isQuizCompleted &&
                      userAnswers.find(
                        (ua) =>
                          ua.id === questionItem.id &&
                          ua.answer.toLowerCase() !== questionItem.answer
                      ) && (
                        <div className="mt-2 text-red-500">
                          Jawaban yang benar: {questionItem.answer}
                        </div>
                      )}
                    {!isQuizCompleted &&
                      UnAnsweredQuestion &&
                      !userAnswers.some((answer) => answer.id === questionItem.id) && (
                        <div className="mt-2 text-red-500">Pertanyaan diatas belum dijawab!</div>
                      )}
                  </div>
                );
              }
            })}
        </div>
        <div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isQuizCompleted}
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
          Benar {score} dari {questions.length} pertanyaan
        </div>
      </div>
    </div>
  );
};

export default Quiz;
