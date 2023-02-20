import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HistoryList from '../../components/Home/HistoryList';
import QuizList from '../../components/Home/QuizList';

function Home({ tests, loading, loadTests, user }) {
  const loadData = useCallback(async () => {
    await Promise.all([loadTests()]);
  }, [loadTests]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <h1 data-testid="loading">Loading...</h1>;
  }

  return (
    <div className="quizapp">
      {/* <section className="quizapp__head">
        <div className="container">Head</div>
      </section> */}

      <section className="quizapp__body flex-1 mt-5">
        <div className="container">
          <div className="quiz-list mb-5">
            <h2 className="text-xl mb-2">Quiz</h2>
            {tests.length > 0
              ? tests.map(test => <QuizList key={test.id} test={test} />)
              : 'No test available...'}
          </div>
          <div className="quiz-history">
            <h2 className="text-xl mb-2">History</h2>
            {(user && tests.length > 0)
              ? user.quizHistory.map(test => {
                  const testName = tests.find(
                    element => element.id === test.testID,
                  );
                  return <HistoryList key={test.testID} test={test} testName={testName.name} />;
                })
              : 'No history available...'}
          </div>
        </div>
      </section>

      {/* <section className="quizapp__footer">
        <div className="container">Footer</div>
      </section> */}
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
          answer: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
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
  loadTests: PropTypes.func.isRequired,
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
  loadTests: () =>
    dispatch({
      type: 'LOAD_TESTS_REQUEST',
      payload: {
        url: '660/tests',
        method: 'get',
      },
      meta: { loadingId: -1 },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
