import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

export function* loadTests({ payload, meta }) {
  try {
    const res = yield call(axiosInstance, payload);
    yield put({
      type: 'LOAD_TESTS_SUCCESS',
      payload: res,
      meta,
    });
  } catch (error) {
    yield put({ type: 'LOAD_TESTS_FAIL', payload: error, meta });
  }
}

function* loadTestsRequest() {
  yield takeEvery('LOAD_TESTS_REQUEST', loadTests);
}

export default function* rootTestsSaga() {
  yield all([fork(loadTestsRequest)]);
}
