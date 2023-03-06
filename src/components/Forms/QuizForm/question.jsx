/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './option';

function Question({ question, options, step, data, setData }) {
  return (
    <div>
      <h2 className="text-xl mb-4">{question}</h2>
      <ul>
        {options.map((option, i) => (
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
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(Question);
