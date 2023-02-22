import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import testsSaga from './testsSaga';
import quizSaga from './quizSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(testsSaga), fork(quizSaga)]);
}