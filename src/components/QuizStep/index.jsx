import React from 'react';
import PropTypes from 'prop-types';

function QuizStep({
  step,
  handlePrevSteps,
  handleNextSteps,
  handleSubmit,
  data,
  questionsSize,
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
          }}
          disabled={step + 1 !== questionsSize || !data[step]}
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
  handleSubmit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  questionsSize: PropTypes.number.isRequired
};

export default QuizStep;
