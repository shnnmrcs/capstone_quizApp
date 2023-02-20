import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AuthForms from '../../../components/Forms/AuthForms';
import { registerFields, registerInitialValues } from './registerFields';

function Register({ register, registerSuccess }) {
  if (registerSuccess === true) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Register an account
      </h2>
      <div className="auth-form">
        <AuthForms
          initialValues={registerInitialValues}
          onSubmit={register}
          fields={registerFields}
          btnText="Register"
        />
      </div>
    </>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  registerSuccess: PropTypes.bool,
};

Register.defaultProps = {
  registerSuccess: undefined,
};

const mapStateToProps = ({ user }) => ({
  registerSuccess: user?.registerSuccess,
});

const mapDispatchToProps = dispatch => ({
  register: (values, actions) =>
    dispatch({
      type: 'REGISTER_REQUEST',
      payload: values,
      meta: {
        loadingId: -1,
      },
      actions
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
