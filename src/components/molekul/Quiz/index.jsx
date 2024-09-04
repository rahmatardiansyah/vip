import { useEffect } from 'react';
import quizData from '../../../data/quiz.js';
import { useLocation } from 'react-router-dom';
import { useQuiz } from '../../../context/QuizContext'; // Import custom hook

const Quiz = () => {
  const { state, dispatch } = useQuiz();
  const slug = useLocation().pathname.split('/')[1];

  const { questions, selectedAnswers, revealedAnswers, results } = state;

  useEffect(() => {
    if (localStorage.getItem(`${slug}-data`)) {
      const data = JSON.parse(localStorage.getItem(`${slug}-data`));
      dispatch({ type: 'SET_DATA', payload: data, slug: slug });
      return;
    }
    const data = quizData
      .filter((item) => item.slug === slug)
      .map((item) => {
        if (item.type === 'dynamic-input') {
          const { question, answer } = item.generateQuestion();
          return { ...item, question, answer };
        }
        return item;
      });

    dispatch({ type: 'SET_QUESTIONS', payload: data, slug: slug });
  }, [slug, dispatch]);

  const handleOptionSelect = (qId, option) => {
    dispatch({ type: 'SET_SELECTED_ANSWER', payload: { qId, answer: option }, slug: slug });
  };

  const confirmAnswers = () => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        correct += 1;
      } else {
        incorrect += 1;
      }
    });

    dispatch({ type: 'SET_RESULTS', payload: { correct, incorrect }, slug: slug });
    dispatch({ type: 'SET_REVEALED_ANSWERS', payload: true, slug: slug });
  };

  const resetAnswers = () => {
    dispatch({ type: 'RESET_ANSWERS', slug: slug });
  };

  const allQuestionsAnswered =
    questions && Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="px-4">
      <div className="max-w-screen-md mx-auto bg-white shadow border rounded p-4">
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
                        className={`cursor-pointer flex items-center p-4 border rounded my-2 ${selectedAnswers[q.id] === option ? 'bg-blue-200' : 'hover:bg-gray-100'
                          } ${revealedAnswers && q.answer === option ? 'bg-green-200' : ''} ${revealedAnswers && selectedAnswers[q.id] === option && q.answer !== option
                            ? 'bg-red-200'
                            : ''
                          }`}
                        onClick={() => !revealedAnswers && handleOptionSelect(q.id, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
        </div>
        <div>
          {questions &&
            questions
              .filter((item) => item.type === 'static-input')
              .map((data) => (
                <div key={data.id} className="border p-2 my-2">
                  <h4 className="my-4 text-xl">{data.question}</h4>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={selectedAnswers[data.id] || ''}
                    onChange={(e) =>
                      !revealedAnswers && handleOptionSelect(data.id, e.target.value)
                    }
                  />
                  {revealedAnswers &&
                    (data.answer === selectedAnswers[data.id] ? (
                      <div className="p-2 bg-green-200 my-4 rounded">Jawaban Benar</div>
                    ) : (
                      <div className="p-2 bg-red-200 my-4 rounded">
                        Jawaban Salah, yang benar adalah {data.answer}
                      </div>
                    ))}
                </div>
              ))}
        </div>
        <div>
          {questions &&
            questions
              .filter((item) => item.type === 'dynamic-input')
              .map((data) => (
                <div key={data.id} className="border p-2 my-2">
                  <h4 className="my-4 text-xl">{data.question}</h4>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={selectedAnswers[data.id] || ''}
                    onChange={(e) =>
                      !revealedAnswers && handleOptionSelect(data.id, e.target.value)
                    }
                  />
                  {revealedAnswers &&
                    (data.answer === selectedAnswers[data.id] ? (
                      <div className="p-2 bg-green-200 my-4 rounded">Jawaban Benar</div>
                    ) : (
                      <div className="p-2 bg-red-200 my-4 rounded">
                        Jawaban Salah, yang benar adalah {data.answer}
                      </div>
                    ))}
                </div>
              ))}
        </div>
        {allQuestionsAnswered && (
          <div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={confirmAnswers}
            >
              Konfirmasi Jawaban
            </button>
            <button
              className="ml-2 mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={resetAnswers}
            >
              Reset Jawaban
            </button>
          </div>
        )}
        {revealedAnswers && (
          <div className="mt-4">
            <div className="text-green-600">Jawaban Benar: {results.correct}</div>
            <div className="text-red-600">Jawaban Salah: {results.incorrect}</div>
          </div>
        )}
        <div className="text-gray-500 mt-4">
          {Object.keys(selectedAnswers).length} terjawab dari {questions ? questions.length : 0}{' '}
          pertanyaan
        </div>
      </div>
    </div>
  );
};

export default Quiz;
