import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthForms from '../../../components/Forms/AuthForms';
import { loginFields, loginInitialValues } from './loginFields';

function Login({ login }) {
  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
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
        <AuthForms
          initialValues={loginInitialValues}
          onSubmit={login}
          fields={loginFields}
          btnText="Sign in"
        >
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="forgot_password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </AuthForms>
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
