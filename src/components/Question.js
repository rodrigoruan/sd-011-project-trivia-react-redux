import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';
import Answers from './Answers';

class Question extends Component {
  constructor() {
    super();
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { startCountdownAction } = this.props;
    startCountdownAction();
  }

  componentDidUpdate() {
    const { timer, answerPicked } = this.props;
    if (timer <= 0 && answerPicked === false) {
      this.timesUp();
    }
  }

  timesUp() {
    const { stopCountdownAction, pickAnswerAction } = this.props;
    stopCountdownAction();
    pickAnswerAction();
    // this.checkAnswer('incorrect');
  }

  nextQuestion() {
    const {
      currentQuestion,
      history,
      nextQuestionAction,
      saveRankAction,
      startCountdownAction,
      pickAnswerAction,
    } = this.props;
    const numOfQuestions = 4;
    pickAnswerAction();
    if (currentQuestion >= numOfQuestions) {
      saveRankAction();
      history.push('/feedback');
    } else {
      nextQuestionAction();
      startCountdownAction();
    }
  }

  decodeHtml(html) { // https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  renderNextButton() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.nextQuestion }>
        Próxima
      </button>
    );
  }

  render() {
    const { questionsArr, currentQuestion, timer, answerPicked } = this.props;
    return (
      <div>
        <p data-testid="question-text">
          { this.decodeHtml(questionsArr[currentQuestion].question) }
        </p>
        <p data-testid="question-category">
          { this.decodeHtml(questionsArr[currentQuestion].category) }
        </p>
        <Answers />

        {answerPicked ? this.renderNextButton() : ''}
        <h3>
          { timer }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
  timer: state.questions.timer,
  answerPicked: state.questions.answerPicked,
});

const mapDispatchToProps = (dispatch) => ({
  startCountdownAction: () => dispatch(actions.startCountdown()),
  stopCountdownAction: () => dispatch(actions.stopCountdown()),
  nextQuestionAction: () => dispatch(actions.nextQuestion()),
  saveRankAction: () => dispatch(actions.saveRank()),
  pickAnswerAction: () => dispatch(actions.pickAnswer()),
});

Question.propTypes = {
  questionsArr: PropTypes.arrayOf(PropTypes.object),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Question));
