import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthForm from '../../../components/Forms/AuthForm';
import { loginFields, loginInitialValues } from './loginFields';

function Login({ login }) {
  return (
    <>
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p className="my-6 text-center text-sm text-gray-600">
        <Link
          to="register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          No account yet? Register here
        </Link>
      </p>
      <div className="auth-form">
        <AuthForm
          initialValues={loginInitialValues}
          onSubmit={login}
          fields={loginFields}
          btnText="Sign in"
        />
      </div>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: (values, actions) =>
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: values,
      meta: {
        loadingId: -1,
      },
      actions,
    }),
});

export default connect(null, mapDispatchToProps)(Login);
