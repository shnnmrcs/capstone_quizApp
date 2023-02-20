import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Errors from '../../components/Errors';

function MainLayout({ user, userInitialState }) {
  if (!user && userInitialState === false) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Outlet />
      <Errors />
    </>
  );
}

MainLayout.propTypes = {
  user: PropTypes.shape({}),
  userInitialState: PropTypes.bool.isRequired,
};

MainLayout.defaultProps = {
  user: null,
};

const mapStateToProps = ({ user: { user, userInitialState } }) => ({
  user,
  userInitialState,
});

export default connect(mapStateToProps)(MainLayout);
