/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HistoryList from '../../components/Home/HistoryList';
import QuizList from '../../components/Home/QuizList';

function Home({ tests, loading, user, logout }) {

  if (!user || loading) {
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
              ? tests.map(test => (
                  <QuizList key={test.id} test={test} />
                ))
              : 'No test available...'}
          </div>
          <div className="quiz-history">
            <h2 className="text-xl mb-2">History</h2>
            {tests.length > 0 && user.quizHistory.length > 0
              ? user.quizHistory.map((test,i) => {
                  const testName = tests.find(
                    element => element.id === test.testID,
                  );
                  return (
                    <HistoryList
                      key={i}
                      test={test}
                      testName={testName.name}
                    />
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
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

Home.defaultProps = {
  user: null,
};

const mapStateToProps = ({ user: { user }, tests, loading }) => ({
  user,
  tests,
  loading: loading.some(
    x => x.action === 'LOAD_PRODUCTS' || x.action === 'LOAD_CART',
  ),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
