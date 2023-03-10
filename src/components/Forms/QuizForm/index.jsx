/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressBar from '../../ProgressBar';
import QuizStep from '../../QuizStep';
import Question from './question';
import Result from './result';

function QuizForm({ quiz, submitQuiz, user }) {
  const quizSize = quiz.questionsList.length;

  const [step, setStep] = useState(0);
  const [data, setData] = useState(new Array(quizSize).fill(null));
  const [progress, setProgress] = useState(0);

  const handleNextSteps = useCallback(() => setStep(x => x + 1), []);
  const handlePrevSteps = useCallback(() => setStep(x => x - 1), []);

  const handleSubmit = () => {
    setStep(x => x + 1);
    submitQuiz(data, quiz, user);
  };

  useEffect(() => {
    setProgress((step / quizSize) * 100);
  }, [step]);

  return (
    <>
      {step !== quizSize && (
        <div className="sm:hidden">
          <div className="mb-4 container2">
            <ProgressBar
              progress={progress}
              progressString={`${step}/${quizSize}`}
              propClass="bg-white"
            />
          </div>
        </div>
      )}

      {step !== quizSize ? (
        <div className="flex-1">
          <div className="container2">
            <Question
              question={quiz.questionsList[step].question}
              options={quiz.questionsList[step].options}
              step={step}
              data={data}
              setData={setData}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <div className="container2">
            <Result />
          </div>
        </div>
      )}

      <div className="bg-white py-4">
        <div className="container2">
          <div className="flex items-center gap-4 sm:justify-between">
            {step !== quizSize && (
              <div className="hidden sm:block min-w-[300px]">
                <ProgressBar
                  progress={progress}
                  progressString={`${step}/${quizSize}`}
                  propClass="bg-[#EDE8E3]"
                />
              </div>
            )}
            {step !== quizSize ? (
              <div className="flex gap-2 w-full sm:w-min steps">
                <QuizStep
                  step={step}
                  data={data}
                  handlePrevSteps={handlePrevSteps}
                  handleNextSteps={handleNextSteps}
                  handleSubmit={handleSubmit}
                  questionsSize={quizSize}
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
  quiz: PropTypes.exact({
    _id: PropTypes.string,
    name: PropTypes.string,
    totalWeight: PropTypes.number,
    questionsList: PropTypes.arrayOf(
      PropTypes.exact({
        _id: PropTypes.string,
        type: PropTypes.string,
        question: PropTypes.string,
        answer: PropTypes.number,
        weight: PropTypes.number,
        options: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }).isRequired,
  user: PropTypes.exact({
    _id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  submitQuiz: PropTypes.func.isRequired,
};

export default QuizForm;
