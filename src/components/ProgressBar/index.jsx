import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/progressbar.css'

function ProgressBar({ progress, progressString, propClass }) {
  return (
    <div className="progressBar">
      <div
        className={`progress ${propClass}`}
      >
        <div
          className="col-span-1 progress h-full bg-[#31CD63] rounded-3xl"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center">{progressString}</p>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  progressString: PropTypes.string.isRequired,
  propClass: PropTypes.string.isRequired,
};

export default memo(ProgressBar);
