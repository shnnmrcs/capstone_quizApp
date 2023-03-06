import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AuthForm from '../../../components/Forms/AuthForm';
import { registerFields, registerInitialValues } from './registerFields';

function Register({ apiAuthRequestSaga, registerSuccess }) {
  if (registerSuccess === true) {
    return <Navigate to="/auth" />;
  }

  const validateRegister = values => {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.serverError = 'Password does not match.';
    }

    return errors;
  };

  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Register an account
      </h2>
      <div className="auth-form">
        <AuthForm
          initialValues={registerInitialValues}
          onSubmit={apiAuthRequestSaga}
          fields={registerFields}
          validate={validateRegister}
          btnText="Register"
        />
      </div>
    </>
  );
}

Register.propTypes = {
  apiAuthRequestSaga: PropTypes.func.isRequired,
  registerSuccess: PropTypes.bool,
};

Register.defaultProps = {
  registerSuccess: undefined,
};

const mapStateToProps = ({ user }) => ({
  registerSuccess: user?.registerSuccess,
});

const mapDispatchToProps = dispatch => ({
  apiAuthRequestSaga: (values, actions) =>
    dispatch({
      type: 'REGISTER_REQUEST',
      payload: { data: values, method: 'POST', url: '/api/auth/register' },
      meta: {
        loadingId: -1,
      },
      actions,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
