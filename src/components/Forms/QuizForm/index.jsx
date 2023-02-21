import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from '../../ProgressBar';
import QuizStep from '../../QuizStep';
import Question from './question';
import Result from './result';

function QuizForm({ questionsList, submitQuiz, testID }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(new Array(questionsList.length).fill(null));
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextSteps = useCallback(() => {
    setStep(x => x + 1);
  }, []);
  const handlePrevSteps = useCallback(() => {
    setStep(x => x - 1);
  }, []);

  const handleSubmit = () => {
    setStep(x => x + 1);
    setIsSubmitted(true);
  };

  useEffect(() => {
    setProgress((step / questionsList.length) * 100);
  }, [step]);

  return (
    <>
      {step !== questionsList.length && (
        <div className="sm:hidden">
          <div className="mb-4 container2">
            <ProgressBar
              progress={progress}
              progressString={`${step}/${questionsList.length}`}
              propClass="bg-white"
            />
          </div>
        </div>
      )}

      <div className="flex-1 ">
        <div className="container2">
          {step !== questionsList.length ? (
            <Question
              question={questionsList[step]}
              step={step}
              data={data}
              setData={setData}
            />
          ) : (
            <Result />
          )}
        </div>
      </div>

      <div className="bg-white py-4">
        <div className="container2">
          <div className="flex items-center gap-4 sm:justify-between">
            {step !== questionsList.length && (
              <div className="hidden sm:block min-w-[300px]">
                <ProgressBar
                  progress={progress}
                  progressString={`${step}/${questionsList.length}`}
                  propClass="bg-[#EDE8E3]"
                />
              </div>
            )}
            {!isSubmitted ? (
              <div className="flex gap-2 w-full sm:w-min steps">
                <QuizStep
                  step={step}
                  data={data}
                  handlePrevSteps={handlePrevSteps}
                  handleNextSteps={handleNextSteps}
                  questionsSize={questionsList.length}
                  handleSubmit={handleSubmit}
                  submitQuiz={submitQuiz}
                  questionsList={questionsList}
                  testID={testID}
                />
              </div>
            ) : (
              <div className="flex gap-2 w-full steps">
                <Link to="/" className="btn w-full">
                  Okay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

QuizForm.propTypes = {
  questionsList: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      question: PropTypes.string,
      options: PropTypes.array,
      answer: PropTypes.number,
      weight: PropTypes.number,
    }),
  ).isRequired,
  submitQuiz: PropTypes.func.isRequired,
  testID: PropTypes.number.isRequired,
};

export default QuizForm;
