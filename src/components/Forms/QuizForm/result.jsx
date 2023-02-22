import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Result({ quiz }) {
  console.log(quiz);
  return (
    <div>
      <div className='grid grid-cols-6 gap-3 bg-white py-4 px-8 rounded-t-lg border-b-2'>
        <div className='col-span-1'>img</div>
        <div className='col-span-4'>SCORE GAINED</div>
        <div className='col-span-1 text-end'>{quiz.score}</div>
      </div>
      <div className='grid grid-cols-6 gap-3 bg-white py-4 px-8 rounded-b-lg'>
        <div className='col-span-1'>img</div>
        <div className='col-span-4'>CORRECT ANSWERS</div>
        <div className='col-span-1 text-end'>{quiz.correct}</div>
      </div>
    </div>
  );
}

Result.propTypes = {
  quiz: PropTypes.shape({
    _id: PropTypes.string,
    score: PropTypes.number,
    correct: PropTypes.number,
    testID: PropTypes.string,
    dateTaken: PropTypes.string,
    userID: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = ({ quiz }) => ({
  quiz,
});

export default connect(mapStateToProps)(Result);
