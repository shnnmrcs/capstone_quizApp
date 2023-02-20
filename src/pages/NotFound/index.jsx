import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <div className="text-xl">Page not found</div>
      <Link to="/">
        <div>back to homepage</div>
      </Link>
    </>
  );
}

export default NotFound;
