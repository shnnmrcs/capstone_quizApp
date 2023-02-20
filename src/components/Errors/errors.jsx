/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Error from './error';

function Errors({ errors }) {
  if (errors){
    return '';
  }
  return (
    <div className="">
      {errors.map((x, i) => (
        <Error key={i} bottomGap={i * 90 + 10} err={x} />
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
};

export default Errors;
