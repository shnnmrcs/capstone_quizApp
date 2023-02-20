import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout({ user, userInitialState }) {
  if (user && userInitialState === false) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex min-h-full items-center justify-center py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
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
