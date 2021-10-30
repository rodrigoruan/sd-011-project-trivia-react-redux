import {
  REQUEST_TOKEN,
  GET_TOKEN,
  FAILED_REQUEST_TOKEN,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  error: '',
  loading: false,
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, loading: true };
  case GET_TOKEN:
    return { ...state, token: action.token, loading: false };
  case FAILED_REQUEST_TOKEN:
    return { ...state, error: action.error, loading: false };
  default:
    return state;
  }
}

export default token;
