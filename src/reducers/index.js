import { combineReducers } from 'redux';
import {userReducer as user} from './userReducer';
import loading from './loadingReducer';
import errors from './errorReducer';

export default combineReducers({
  user,
  loading,
  errors,
});