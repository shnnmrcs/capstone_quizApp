import React from 'react';
import PropTypes from 'prop-types';

function QuizStep({
  step,
  handlePrevSteps,
  handleNextSteps,
  questionsSize,
  handleSubmit,
  data,
  questionsList,
  submitQuiz,
  testID,
}) {
  return (
    <>
      {step !== 0 && (
        <button
          type="button"
          className="btn disabled:bg"
          onClick={handlePrevSteps}
          disabled={step === 0}
        >
          Back
        </button>
      )}

      {step + 1 !== questionsSize ? (
        <button
          type="submit"
          className="btn"
          onClick={handleNextSteps}
          disabled={step + 1 === questionsSize || !data[step]}
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="btn"
          onClick={() => {
            handleSubmit();
            submitQuiz(data, questionsList, testID);
          }}
          disabled={step + 1 !== questionsSize}
        >
          Submit
        </button>
      )}
    </>
  );
}

QuizStep.propTypes = {
  step: PropTypes.number.isRequired,
  handleNextSteps: PropTypes.func.isRequired,
  handlePrevSteps: PropTypes.func.isRequired,
  questionsSize: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  submitQuiz: PropTypes.func.isRequired,
  testID: PropTypes.number.isRequired,
  questionsList: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      question: PropTypes.string,
      options: PropTypes.array,
      answer: PropTypes.number,
      weight: PropTypes.number,
    }),
  ).isRequired,
};

export default QuizStep;
