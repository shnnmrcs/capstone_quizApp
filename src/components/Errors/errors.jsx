/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Error from './error';

function Errors({ errors, updateError }) {

  return (
    <div className="">
      errors
      {errors.map((x, i) => (
        <Error key={i} bottomGap={i * 90 + 10} err={x} index={i} updateError={updateError} />
      ))}
    </div>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.exact({
      action: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      loadingId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  updateError: PropTypes.func.isRequired,
};

export default Errors;
