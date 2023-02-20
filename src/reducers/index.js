import { combineReducers } from 'redux';
import {userReducer as user} from './userReducer';
import tests from './testsReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  user,
  tests,
  loading,
  errors,
});