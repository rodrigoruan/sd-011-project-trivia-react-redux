import { MD5 } from 'crypto-js';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_FAIL = 'REQUEST_QUESTIONS_FAIL';
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SET_INNITIAL_TIME = 'SET_INITIAL_TIME';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const PICK_ANSWER = 'PICK_ANSWER';

const questionsURL = 'https://opentdb.com/api.php?amount=5&token=';
const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const saveLogin = (email, name) => {
  const state = {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  };

  localStorage.setItem('state', JSON.stringify(state));
  return {
    type: SAVE_LOGIN,
    email,
    name,
  };
};

export const pickAnswer = () => ({
  type: PICK_ANSWER,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

export const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  return fetch(tokenURL)
    .then((result) => result.json())
    .then((data) => {
      dispatch(requestTokenSuccess(data));
      localStorage.setItem('token', data.token);
    })
    .catch((error) => dispatch(requestTokenError(error)));
};

const requestQuestions = (payload) => ({
  type: REQUEST_QUESTIONS,
  payload,
});

const requestQuestionsSucces = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

const requestQuestionsFail = (payload) => ({
  type: REQUEST_QUESTIONS_FAIL,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`${questionsURL}${token}`)
    .then((result) => result.json())
    .then((data) => dispatch(requestQuestionsSucces(data)))
    .catch((error) => dispatch(requestQuestionsFail(error)));
};

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});
const setInnitialTime = () => ({
  type: SET_INNITIAL_TIME,
});

const updateClock = () => ({
  type: UPDATE_CLOCK,
});

let timer = null;
export const startCountdown = () => (dispatch) => { //  codigo adaptado de https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
  const sec = 1000;
  dispatch(setInnitialTime());
  timer = setInterval(() => dispatch(updateClock()), sec);
};

export const stopCountdown = () => {
  clearInterval(timer);
  return { type: STOP_COUNTDOWN };
};

export const updateScore = (payload) => {
  const state = JSON.parse(localStorage.getItem('state'));
  state.player.score += payload;
  state.player.assertions += 1;
  localStorage.setItem('state', JSON.stringify(state));
  return {
    type: UPDATE_SCORE,
    payload,
  };
};

export const saveRank = () => () => {
  const state = JSON.parse(localStorage.getItem('state'));
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const emailHash = MD5(state.player.gravatarEmail);
  const current = {
    name: state.player.name,
    score: state.player.score,
    picture: `https://www.gravatar.com/avatar/${emailHash}`,
  };
  if (!ranking) {
    localStorage.setItem('ranking', JSON.stringify([current]));
  } else {
    const newRanking = [...ranking, current];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }
};
