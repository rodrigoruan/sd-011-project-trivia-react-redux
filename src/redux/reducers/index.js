import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';

const reducer = combineReducers({ user, questions });

export default reducer;
