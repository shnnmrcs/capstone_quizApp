import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

export function* apiAuthRequestSaga({ type, payload, meta }) {
  const match = /(.*)_(REQUEST)/.exec(type);
  const [, actionName] = match;

  try {
    const { confirmPassword, ...registerData } = payload.data;
    const res = yield call(axiosInstance, {
      method: payload.method,
      url: payload.url,
      data: actionName === 'REGISTER' ? registerData : payload.data,
    });

    yield put({
      type: `${actionName}_SUCCESS`,
      payload: res,
      meta:
        actionName === 'REGISTER' ? { ...meta, registerSuccess: true } : meta,
    });
  } catch (error) {
    yield put({
      type: `${actionName}_FAIL`,
      payload: error,
      meta,
    });
  }
}

function* loginRequest() {
  yield takeLatest('LOGIN_REQUEST', apiAuthRequestSaga);
}

function* registerRequest() {
  yield takeLatest('REGISTER_REQUEST', apiAuthRequestSaga);
}

export default function* rootAuthSaga() {
  yield all([fork(loginRequest), fork(registerRequest)]);
}
