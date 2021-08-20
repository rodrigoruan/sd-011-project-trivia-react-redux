import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';

class Answers extends Component {
  constructor() {
    super();
    this.state = {
      randomNumber: 0,
    };
    this.buttonClicked = this.buttonClicked.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    this.setRandom();
  }

  setRandom() {
    const max = 4;
    const random = Math.floor(Math.random() * max);
    this.setState({ randomNumber: random });
  }

  checkAnswer(answer) {
    const { timer, questionsArr, currentQuestion, updateScoreAction } = this.props;
    if (answer === 'incorret') {
      return;
    }
    const obj = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const base = 10;
    const dificulty = questionsArr[currentQuestion].difficulty;
    const score = (base + (timer * obj[dificulty]));
    updateScoreAction(score);
  }

  buttonClicked({ target }) {
    const { stopCountdownAction, pickAnswerAction } = this.props;
    stopCountdownAction();
    pickAnswerAction();
    this.checkAnswer(target.dataset.answer);
  }

  shufleAnswers(right, wrongs) {
    const { randomNumber } = this.state;
    wrongs.splice(randomNumber, 0, right);
    return wrongs;
  }

  multipleQuestion() {
    const { questionsArr, currentQuestion, answerPicked } = this.props;
    const rightAnswer = (
      <button
        type="button"
        data-testid="correct-answer"
        data-answer="correct"
        key="right"
        onClick={ this.buttonClicked }
        className={ answerPicked ? 'correct' : '' }
        disabled={ answerPicked }
      >
        { questionsArr[currentQuestion].correct_answer }
      </button>);
    const wrongAnswer = questionsArr[currentQuestion].incorrect_answers
      .map((item, index) => (
        <button
          type="button"
          key={ `wrong-${index}` }
          data-testid={ `wrong-answer-${index}` }
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ answerPicked ? 'wrong' : '' }
          disabled={ answerPicked }
        >
          { item }
        </button>
      ));
    const shufledAnswer = this.shufleAnswers(rightAnswer, wrongAnswer);
    return (
      <div className="answers">
        { shufledAnswer }
      </div>
    );
  }

  bolleanQuestion() {
    const { questionsArr, currentQuestion, answerPicked } = this.props;
    if (questionsArr[currentQuestion].correct_answer) return this.renderTrueFalse();
    return (
      <div className="answers">
        <button
          type="button"
          data-testid="wrong-answer-0"
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ answerPicked ? 'wrong' : '' }
          disabled={ answerPicked }
        >
          True
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          data-answer="correct"
          onClick={ this.buttonClicked }
          className={ answerPicked ? 'correct' : '' }
          disabled={ answerPicked }
        >
          False
        </button>
      </div>
    );
  }

  renderTrueFalse() {
    const { answerPicked } = this.props;
    return (
      <div className="answers">
        <button
          type="button"
          data-testid="correct-answer"
          data-answer="correct"
          onClick={ this.buttonClicked }
          className={ answerPicked ? 'correct' : '' }
          disabled={ answerPicked }
        >
          True
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          data-answer="incorret"
          onClick={ this.buttonClicked }
          className={ answerPicked ? 'wrong' : '' }
          disabled={ answerPicked }
        >
          False
        </button>
      </div>
    );
  }

  renderAwnserButtons() {
    const { questionsArr, currentQuestion } = this.props;
    if (questionsArr[currentQuestion].type === 'boolean') return this.bolleanQuestion();
    return this.multipleQuestion();
  }

  render() {
    return (
      <>
        { this.renderAwnserButtons() }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsArr: state.questions.questionsArr,
  currentQuestion: state.questions.currentQuestion,
  answerPicked: state.questions.answerPicked,
  timer: state.questions.timer,
});

const mapDispatchToProps = (dispatch) => ({
  stopCountdownAction: () => dispatch(actions.stopCountdown()),
  updateScoreAction: (score) => dispatch(actions.updateScore(score)),
  pickAnswerAction: () => dispatch(actions.pickAnswer()),
});

Answers.propTypes = {
  questionsArr: PropTypes.arrayOf(PropTypes.object),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
