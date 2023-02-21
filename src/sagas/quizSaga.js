import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

export function* submitQuiz({ payload, meta }) {
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

function* submitQuizRequest() {
  yield takeEvery('SUBMIT_QUIZ_REQUEST', submitQuiz);
}

export default function* rootQuizSaga() {
  yield all([fork(submitQuizRequest)]);
}
