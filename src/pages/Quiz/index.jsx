import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { connect } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
// import QuizComponent from '../../components/QuizComponent';
import QuizForm from '../../components/Forms/QuizForm';

function Quiz({ tests, submitQuiz, user }) {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    setQuiz(tests.find(test => test.id === Number(id)));
  }, [tests]);

  if (tests.length && tests.length < Number(id))
    return <Navigate to="/" replace />;

  if (!quiz || !user) return <h1>Loading...</h1>;

  return (
    <div className="quizapp">
      <section className="quizapp__head">
        <div className="container">
          <div className="flex justify-between items-center gap-2">
            <span className="points">{quiz.totalWeight}</span>
            <h1 className="quizName">{quiz.name}</h1>
            <Link
              to="/"
              className="-m-2 p-1 mr-1 bg-white text-black hover:text-gray-500 rounded-full"
            >
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="quizapp__body flex-1">
        <div className="h-full flex flex-col content-center">
          <QuizForm
            questionsList={quiz.questionsList}
            submitQuiz={submitQuiz}
            testID={quiz.id}
            user={user}
          />
        </div>
      </section>
    </div>
  );
}

Quiz.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      questionsList: PropTypes.arrayOf(
        PropTypes.exact({
          type: PropTypes.string,
          question: PropTypes.string,
          options: PropTypes.array,
          answer: PropTypes.number,
          weight: PropTypes.number,
        }),
      ).isRequired,
      totalWeight: PropTypes.number.isRequired,
    }),
  ).isRequired,
  submitQuiz: PropTypes.func.isRequired,
  user: PropTypes.exact({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    quizHistory: PropTypes.arrayOf(
      PropTypes.exact({
        testID: PropTypes.number,
        score: PropTypes.number,
        dateTaken: PropTypes.string,
      }),
    ),
  }),
};

Quiz.defaultProps = {
  user: null,
};

const mapStateToProps = ({ tests, user: { user } }) => ({
  tests,
  user,
});

const mapDispatchToProps = dispatch => ({
  submitQuiz: (data, questionsList, testID, user) =>
    dispatch({
      type: 'SUBMIT_QUIZ_REQUEST',
      payload: {
        data,
        questionsList,
        testID,
        user,
      },
      meta: {
        loadingId: -1,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
