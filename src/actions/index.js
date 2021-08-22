import md5 from 'crypto-js/md5';
import shuffleArray from '../services/shuffleArray';

export const USER_DATA = 'USER_DATA';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SHOW_NEXT_BTN = 'SHOW_NEXT_BTN';
export const CHANGE_TO_NEXT_QUESTION = 'CHANGE_TO_NEXT_QUESTION';
export const TICK_COUNTDOWN = 'TICK_COUNTDOWN';
export const RESET_COUNTDOWN = 'RESET_COUNTDOWN';
export const RESTART_GAME = 'RESTART_GAME';

export const getUserData = (name, email, token) => {
  const hash = md5(email).toString();
  return {
    type: USER_DATA,
    name,
    email,
    token,
    gravatarImage: `https://www.gravatar.com/avatar/${hash}?d=404`,
  };
};

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const receiveQuestions = (data) => ({
  type: RECEIVE_QUESTIONS,
  data,
});

export const requestApiQuestions = (token) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        receiveQuestions({
          ...data,
          results: data.results.map((question) => ({
            ...question,
            answers: shuffleArray([
              question.correct_answer,
              ...question.incorrect_answers,
            ]),
          })),
        }),
      );
    });
};

export const showNextBtn = (answer) => ({
  type: SHOW_NEXT_BTN,
  answer,
});

export const changeToNextQuestion = () => ({
  type: CHANGE_TO_NEXT_QUESTION,
});

export const tickCountdown = () => ({
  type: TICK_COUNTDOWN,
});

export const resetCountdown = () => ({
  type: RESET_COUNTDOWN,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});
