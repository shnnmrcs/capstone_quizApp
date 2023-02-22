/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './option';

function Question({ question, step, data, setData }) {
  return (
    <div>
      <h2 className="text-xl mb-4">{question.question}</h2>
      <ul>
        {question.options.map((option, i) => (
          <Option
            key={i}
            option={option}
            step={step}
            data={data}
            setData={setData}
            index={i}
          />
        ))}
      </ul>
    </div>
  );
}

Question.propTypes = {
  step: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  setData: PropTypes.func.isRequired,
  question: PropTypes.exact({
    _id: PropTypes.string,
    type: PropTypes.string,
    question: PropTypes.string,
    options: PropTypes.array,
    answer: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
};

export default memo(Question);
