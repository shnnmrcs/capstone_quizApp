import clsx from 'clsx';
import React, { memo } from 'react';
import PropTypes from 'prop-types'
import '../../../styles/option.css'

function Option({ option, step, data, setData, index }) {
  return (
    <li className="option">
      <button
        type="button"
        className={clsx('option__button', {
          'selected': data[step] === index + 1
        })}
        onClick={() =>
          setData(x => [...x.slice(0, step), index + 1, ...x.slice(step + 1)])
        }
      >
        {option}
      </button>
    </li>
  );
}

Option.propTypes = {
  step: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  option: PropTypes.string.isRequired,
};

export default memo(Option);
