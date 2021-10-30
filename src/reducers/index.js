import { combineReducers } from 'redux';
import token from './token';
import questions from './questions';

const rootReducer = combineReducers({ token, questions });

export default rootReducer;
