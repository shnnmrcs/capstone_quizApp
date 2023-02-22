import React from 'react';
import PropTypes from 'prop-types';

function HistoryList({ test, testName }) {
  return (
    <div className="quiz-history-list mb-5">
      <div className="quizdata bg-orange-200">
        <div>
          <h3 className="font-bold">Test Name:</h3>
          <p>{testName}</p>
        </div>
        <div>
          <h3 className="font-bold">Score:</h3>
          <p>{test.score}</p>
        </div>
        <div>
          <h3 className="font-bold">Date taken:</h3>
          <p>{test.dateTaken}</p>
        </div>
      </div>
    </div>
  );
}

HistoryList.propTypes = {
  test: PropTypes.exact({
    _id: PropTypes.string,
    testID: PropTypes.string,
    score: PropTypes.number,
    dateTaken: PropTypes.string,
  }).isRequired,
  testName: PropTypes.string.isRequired
};

export default HistoryList;
