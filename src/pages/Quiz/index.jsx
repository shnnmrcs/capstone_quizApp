/* eslint-disable no-underscore-dangle */
// import QuizComponent from '../../components/QuizComponent';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { connect } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import QuizForm from '../../components/Forms/QuizForm';

function Quiz({ tests, submitQuiz, user }) {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    setQuiz(tests.find(test => test._id === String(id)));
  }, [tests]);

  if (!tests.find(elem => elem._id === String(id)))
    return <Navigate to="/" replace />;

  if (!quiz) return <h1>Loading Quiz...</h1>;

  if (!user) return <h1>Loading User...</h1>;

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
            testID={quiz._id}
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
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      questionsList: PropTypes.arrayOf(
        PropTypes.exact({
          _id: PropTypes.string,
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
    _id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    quizHistory: PropTypes.arrayOf(
      PropTypes.exact({
        testID: PropTypes.string,
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
