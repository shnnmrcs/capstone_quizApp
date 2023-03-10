import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Result({ result }) {
  if (!result) return 'Loading...';

  return (
    <div>
      <div className="grid grid-cols-6 gap-3 bg-white py-4 px-8 rounded-t-lg border-b-2">
        <div className="col-span-1">img</div>
        <div className="col-span-4">SCORE GAINED</div>
        <div className="col-span-1 text-end">{result.score}</div>
      </div>
      <div className="grid grid-cols-6 gap-3 bg-white py-4 px-8 rounded-b-lg">
        <div className="col-span-1">img</div>
        <div className="col-span-4">CORRECT ANSWERS</div>
        <div className="col-span-1 text-end">{result.correct}</div>
      </div>
    </div>
  );
}

Result.propTypes = {
  result: PropTypes.objectOf(PropTypes.number),
};

Result.defaultProps = {
  result: null,
};

const mapStateToProps = ({
  quizzes: {
    current: { result },
  },
}) => ({
  result,
});

export default connect(mapStateToProps)(Result);
