import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Error({ bottomGap, err }) {
  const { message, title } = err;
  const [show, setShow] = useState(true);
  const uniqueKey = new Date().getTime();

  // Component did
  useEffect(() => {
    const time = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  if (show !== true) {
    return '';
  }
  return (
    <div
      key={`${uniqueKey}`}
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 fixed left-10 min-w-[320px]"
      role="alert"
      style={{
        bottom: bottomGap,
      }}
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
}

Error.propTypes = {
  err: PropTypes.exact({
    action: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    loadingId: PropTypes.number.isRequired,
  }).isRequired,
  bottomGap: PropTypes.number.isRequired,
};

export default Error;
