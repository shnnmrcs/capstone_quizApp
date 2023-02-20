import React from 'react';
import PropTypes from 'prop-types';

function QuizList({ test }) {
  return (
    <div className="quiz-list mb-5">
      <div className="quiz-history-list">
        <div className="quizdata bg-green-200">
          <div>
            <h3 className="font-bold">Test Name:</h3>
            <p>{test.name}</p>
          </div>
          <div>
            <h3 className="font-bold">Score:</h3>
            <p>{test.totalWeight}</p>
          </div>
          <div>
            <button type="button" className="btn">
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuizList.propTypes = {
    test: PropTypes.exact({
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
    }).isRequired,
};

export default QuizList;
