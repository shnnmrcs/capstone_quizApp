import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';

function BaseLayout({ checkLogin }) {

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}

BaseLayout.propTypes = {
  checkLogin: PropTypes.func.isRequired,
};

const token = localStorage.getItem('token');
const JSONToken = token ? JSON.parse(token) : { accessToken: '', user: null };

const mapDispatchToProps = dispatch => ({
  checkLogin: () =>
    dispatch({
      type: 'CHECK_LOGIN',
      payload: JSONToken
    }),
});

export default connect(null, mapDispatchToProps)(BaseLayout);
