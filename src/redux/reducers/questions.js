import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_FAIL,
  REQUEST_QUESTIONS_SUCCESS,
  NEXT_QUESTION,
  UPDATE_CLOCK,
  PICK_ANSWER,
} from '../actions';

const INNITIAL_STATE = {
  questionsArr: [],
  currentQuestion: 0,
  loading: true,
  timer: 30,
  answerPicked: false,
};

function questions(state = INNITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, loading: true };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questionsArr: [...action.payload.results],
      loading: false,
      currentQuestion: 0,
    };
  case REQUEST_QUESTIONS_FAIL:
    return { ...state, error: action.payload, loading: false };
  case PICK_ANSWER:
    return { ...state, answerPicked: !state.answerPicked };
  case NEXT_QUESTION:
    return { ...state, currentQuestion: state.currentQuestion + 1 };
  case 'SET_INITIAL_TIME':
    return { ...state, timer: 30 };
  case UPDATE_CLOCK:
    return { ...state, timer: state.timer - 1 };
  default:
    return state;
  }
}

export default questions;
