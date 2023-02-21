import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout({ user, userInitialState }) {
  if (user && userInitialState === false) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="container flex min-h-screen items-center justify-center py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-md space-y-8">
        <Outlet />
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  user: PropTypes.shape({}),
  userInitialState: PropTypes.bool.isRequired,
};

AuthLayout.defaultProps = {
  user: null,
};

const mapStateToProps = ({ user: { user, userInitialState } }) => ({
  user,
  userInitialState
});

export default connect(mapStateToProps)(AuthLayout);
