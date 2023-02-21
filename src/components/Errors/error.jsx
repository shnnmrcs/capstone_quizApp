import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function Error({ bottomGap, err }) {
  const { message, title } = err;
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const uniqueKey = new Date().getTime();

  useEffect(() => {
    const timeShow = setTimeout(() => {
      // After 4 seconds set the show value to false
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(timeShow);
    };
  }, []);

  useEffect(() => {
    const timeFadeOut = setTimeout(() => {
      // After 3.1 seconds set the fadeOut value to false
      setFadeOut(true);
    }, 3100);

    return () => {
      clearTimeout(timeFadeOut);
    };
  }, []);

  if (show !== true) {
    return '';
  }
  return (
    <div
      key={`${uniqueKey}`}
      className={`bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 fixed left-10 min-w-[320px]${
        fadeOut ? ' animate-fade' : ''
      }`}
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
