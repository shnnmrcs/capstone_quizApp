import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Errors from '../../components/Errors';

function MainLayout({ user, userInitialState, loadTests }) {
  if (!user && userInitialState === false) {
    return <Navigate to="/auth" replace />;
  }
  const loadData = useCallback(async () => {
    await Promise.all([loadTests()]);
  }, [loadTests]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
  quiz: PropTypes.shape({}),
  loadTests: PropTypes.func.isRequired
};

MainLayout.defaultProps = {
  user: null,
  quiz: null,
};

const mapStateToProps = ({ user: { user, userInitialState }, quiz }) => ({
  user,
  userInitialState,
  quiz,
});

const mapDispatchToProps = dispatch => ({
  loadTests: () =>
    dispatch({
      type: 'LOAD_TESTS_REQUEST',
      payload: {
        url: '660/tests',
        method: 'get',
      },
      meta: { loadingId: -1 },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
