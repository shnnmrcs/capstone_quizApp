import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import tests from './testsReducer';
// import quiz from './quizReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  user,
  tests,
  // quiz,
  loading,
  errors,
});
