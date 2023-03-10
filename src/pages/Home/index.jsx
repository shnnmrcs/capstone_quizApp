/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HistoryList from '../../components/Home/HistoryList';
import QuizList from '../../components/Home/QuizList';

function Home({
  loading,
  user,
  loadTests,
  tests,
  loadHistory,
  history,
  logout,
}) {
  const loadData = useCallback(async () => {
    await Promise.all([loadTests(), loadHistory(user._id)]);
  }, [loadTests, loadHistory, user]);

  useEffect(() => {
    if (user) loadData();
  }, [loadData]);

  if (loading || !user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="quizapp">
      <section className="quizapp__head py-4">
        <div className="container">
          <div className="flex justify-between items-center gap-2">
            <p>Welcome {user.name}!</p>
            <button type="button" className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </section>

      <section className="quizapp__body flex-1 py-5">
        <div className="container">
          <div className="quiz-list mb-5">
            <h2 className="text-xl mb-2">Quiz</h2>
            {tests.length > 0
              ? tests.map(test => <QuizList key={test._id} test={test} />)
              : 'No test available...'}
          </div>
          <div className="quiz-history">
            <h2 className="text-xl mb-2">History</h2>
            {history.length > 0
              ? history.map((quiz, i) => {
                  const testName = tests.find(elem => elem._id === quiz.testID);
                  return (
                    <HistoryList key={i} test={quiz} testName={testName.name} />
                  );
                })
              : 'No history available...'}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string,
      questionsList: PropTypes.arrayOf(
        PropTypes.exact({
          type: PropTypes.string,
          question: PropTypes.string,
          options: PropTypes.array,
          answer: PropTypes.number,
          weight: PropTypes.number,
          _id: PropTypes.string,
        }),
      ).isRequired,
      totalWeight: PropTypes.number,
    }),
  ),
  history: PropTypes.arrayOf(
    PropTypes.exact({
      _id: PropTypes.string,
      testID: PropTypes.string,
      score: PropTypes.number,
      dateTaken: PropTypes.string,
      userID: PropTypes.string,
    }),
  ),
  user: PropTypes.exact({
    _id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loadTests: PropTypes.func.isRequired,
  loadHistory: PropTypes.func.isRequired,
};

Home.defaultProps = {
  user: null,
  tests: null,
  history: null,
};

const mapStateToProps = ({
  user: { user },
  tests,
  quizzes: { history },
  loading,
}) => ({
  user,
  tests,
  history,
  loading: loading.some(
    x => x.action === 'LOAD_TESTS' || x.action === 'LOAD_QUIZZES',
  ),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' }),
  loadTests: () =>
    dispatch({
      type: 'LOAD_TESTS_REQUEST',
      payload: {
        url: 'api/tests/getAll',
        method: 'get',
      },
      meta: { loadingId: -1 },
    }),
    loadHistory: id =>
    dispatch({
      type: 'LOAD_HISTORY_REQUEST',
      payload: {
        url: `api/quiz/getAllUserQuiz/${id}`,
        method: 'get',
      },
      meta: { loadingId: -1 },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
