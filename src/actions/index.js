export const GET_QUESTIONS = 'GET_QUESTION';

export const getQuestions = (json) => ({
  type: GET_QUESTIONS,
  json,
});

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const FAILED_REQUEST_QUESTIONS = 'FAILED_REQUEST_QUESTIONS';

export const failedRequestQuestions = (error) => ({
  type: FAILED_REQUEST_QUESTIONS,
  error,
});

export const fetchQuestionsApi = (token) => async (dispatch) => {
  await dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then(
      (json) => dispatch(getQuestions(json)),
      (error) => dispatch(failedRequestQuestions(error)),
    );
};

export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const FAILED_REQUEST_TOKEN = 'FAILED_REQUEST_TOKEN';

export const failedRequestToken = (error) => ({
  type: FAILED_REQUEST_TOKEN,
  error,
});

export const fetchTokenApi = () => async (dispatch) => {
  await dispatch(requestToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(
      (json) => {
        localStorage.setItem('token', json.token);
        dispatch(getToken(json));
        dispatch(fetchQuestionsApi(json.token));
      },
      (error) => dispatch(failedRequestToken(error)),
    );
};
