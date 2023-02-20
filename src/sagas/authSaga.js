import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

export function* login({ payload, meta, actions }) {
  try {
    const res = yield call(axiosInstance, {
      method: 'POST',
      url: 'login',
      data: payload,
    });
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: res,
      meta: { ...meta, from: 'authsaga' },
    });
  } catch (error) {
    yield put({
      type: 'LOGIN_FAIL',
      payload: error,
      meta,
    });
    actions.setSubmitting(false);
    actions.setErrors({ serverError: error.message });
  }
}

export function* register({ payload, meta, actions }) {
  if (payload.password !== payload.confirmPassword) {
    actions.setSubmitting(false);
    actions.setErrors({ serverError: 'Password does not match.' });
    yield put({
      type: 'REGISTER_FAIL',
      payload: { message: 'Password does not match.' },
      meta,
    });
    return;
  }
  const { confirmPassword, ...rest } = payload;
  try {
    const res = yield call(axiosInstance, {
      method: 'POST',
      url: 'register',
      data: rest,
    });
    yield put({
      type: 'REGISTER_SUCCESS',
      payload: res,
      meta: { ...meta, registerSuccess: true, from: 'authsaga' },
    });
    actions.resetForm();
    console.log('register successful', res);
  } catch (error) {
    yield put({
      type: 'REGISTER_FAIL',
      payload: error,
      meta,
    });
    actions.setSubmitting(false);
    actions.setErrors({ serverError: error.message });
  }
}

export function* resetPassword({ payload, meta, actions }) {
  if (payload.newPassword !== payload.confirmNewPassword) {
    actions.setSubmitting(false);
    actions.setErrors({ serverError: 'Password does not match.' });
    yield put({
      type: 'PASSWORD_RESET_FAIL',
      payload: { message: 'Password does not match.' },
      meta,
    });
    return;
  }

  try {
    const userToUpdate = yield call(axiosInstance, {
      method: 'GET',
      url: `users/?email=${payload.email}`,
    });

    if (userToUpdate.length === 0) {
      actions.setSubmitting(false);
      actions.setErrors({ serverError: 'No email found' });
      yield put({
        type: 'PASSWORD_RESET_FAIL',
        payload: { message: 'No email found' },
        meta,
      });
      return;
    }
    try {
      yield call(axiosInstance, {
        method: 'PATCH',
        url: `users/${userToUpdate[0].id}`,
        data: { password: payload.newPassword },
      });
      yield put({
        type: 'PASSWORD_RESET_SUCCESS',
        payload,
        meta: { ...meta, resetPasswordSuccess: true, from: 'authsaga' },
      });
      console.log('password reset successful');
      actions.resetForm();
    } catch (err) {
      actions.setSubmitting(false);
      actions.setErrors({ serverError: err.message });
      yield put({
        type: 'PASSWORD_RESET_FAIL',
        payload: { message: err.message },
        meta,
      });
    }
  } catch (error) {
    actions.setSubmitting(false);
    actions.setErrors({ serverError: error.message });
    yield put({
      type: 'PASSWORD_RESET_FAIL',
      payload: { message: error.message },
      meta,
    });
  }
}

function* loginRequest() {
  yield takeLatest('LOGIN_REQUEST', login);
}

function* registerRequest() {
  yield takeLatest('REGISTER_REQUEST', register);
}

function* resetPasswordRequest() {
  yield takeLatest('PASSWORD_RESET_REQUEST', resetPassword);
}

export default function* rootAuthSaga() {
  yield all([fork(loginRequest), fork(registerRequest), fork(resetPasswordRequest)]);
}
