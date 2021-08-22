import {
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  SHOW_NEXT_BTN,
  CHANGE_TO_NEXT_QUESTION,
  RESTART_GAME,
} from '../actions';

const INITIAL_STATE = {
  response_code: '',
  results: [],
  isFetching: false,
  currentQuestion: 0,
  showBtn: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      response_code: action.data.response_code,
      results: action.data.results,
      isFetching: false,
    };
  case SHOW_NEXT_BTN:
    return {
      ...state,
      showBtn: true,
    };
  case CHANGE_TO_NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      showBtn: false,
    };
  case RESTART_GAME:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default questionsReducer;
