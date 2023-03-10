import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import tests from './testsReducer';
import quizzes from './quizzesReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  user,
  tests,
  quizzes,
  loading,
  errors,
});
