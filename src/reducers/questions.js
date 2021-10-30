import {
  GET_QUESTIONS,
  REQUEST_QUESTIONS,
  FAILED_REQUEST_QUESTIONS,
} from '../actions/index';

const INITIAL_STATE = {
  loading: false,
  error: '',
  questions: '',
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, loading: true };
  case FAILED_REQUEST_QUESTIONS:
    return { ...state, error: action.error, loading: false };
  case GET_QUESTIONS:
    return { ...state, questions: action.json, loading: false };
  default:
    return state;
  }
}

export default questions;
