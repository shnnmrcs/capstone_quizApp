/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { connect } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import QuizForm from '../../components/Forms/QuizForm';

function Quiz({ quiz, submitQuiz, user, loadQuiz, errors }) {
  const { id } = useParams();

  // load data
  const loadData = useCallback(async () => {
    await Promise.all([loadQuiz(id)]);
  }, [loadQuiz]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // redirect if there is no quiz
  if (errors.length && errors.some(x => x.action === 'LOAD_TESTS')) {
    return <Navigate to="/" replace />;
  }

  if (!quiz || !user) return 'Loading...';

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
          <QuizForm quiz={quiz} user={user} submitQuiz={submitQuiz} />
        </div>
      </section>
    </div>
  );
}

Quiz.propTypes = {
  quiz: PropTypes.exact({
    _id: PropTypes.string,
    name: PropTypes.string,
    totalWeight: PropTypes.number,
    questionsList: PropTypes.arrayOf(
      PropTypes.exact({
        _id: PropTypes.string,
        type: PropTypes.string,
        question: PropTypes.string,
        weight: PropTypes.number,
        options: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }),
  user: PropTypes.exact({
    _id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(
    PropTypes.exact({
      action: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
      loadingId: PropTypes.number,
    }),
  ).isRequired,
  submitQuiz: PropTypes.func.isRequired,
  loadQuiz: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  user: null,
  quiz: null,
};

const mapStateToProps = ({
  quizzes: {
    current: { quiz },
  },
  user: { user },
  errors,
}) => ({
  quiz,
  user,
  errors,
});

const mapDispatchToProps = dispatch => ({
  submitQuiz: (data, testID, userID) =>
    dispatch({
      type: 'SUBMIT_QUIZ_REQUEST',
      payload: {
        data,
        testID,
        userID,
      },
      meta: {
        loadingId: -1,
      },
    }),
  loadQuiz: id =>
    dispatch({
      type: 'LOAD_QUIZ_REQUEST',
      payload: {
        url: `api/tests/getOne/${id}`,
        method: 'get',
      },
      meta: { loadingId: -1 },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
