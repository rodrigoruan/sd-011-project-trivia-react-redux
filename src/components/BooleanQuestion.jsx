import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';

class BooleanQuestion extends React.Component {
  trueButton() {
    const {
      question,
      showBtn,
      disabled,
      showAnswer,
      timer,
      localStoragePlayerInfo,
    } = this.props;
    const correctAnswer = (showAnswer) ? 'show-correct-answer' : null;
    const incorrectAnswer = (showAnswer) ? 'show-incorrect-answer' : null;
    return (
      <button
        className={
          (question.correct_answer === 'True')
            ? correctAnswer
            : incorrectAnswer
        }
        disabled={ disabled }
        type="button"
        data-testid={
          (question.correct_answer === 'True')
            ? 'correct-answer'
            : 'wrong-answer'
        }
        onClick={ () => {
          if (question.correct_answer === 'True') {
            localStoragePlayerInfo(timer, question.difficulty);
            showBtn();
          }
          showBtn();
        } }
      >
        True
      </button>
    );
  }

  falseButton() {
    const {
      question,
      showBtn,
      disabled,
      showAnswer,
      timer,
      localStoragePlayerInfo,
    } = this.props;
    const correctAnswer = (showAnswer) ? 'show-correct-answer' : null;
    const incorrectAnswer = (showAnswer) ? 'show-incorrect-answer' : null;
    return (
      <button
        className={
          (question.correct_answer === 'False')
            ? correctAnswer
            : incorrectAnswer
        }
        disabled={ disabled }
        type="button"
        data-testid={
          (question.correct_answer === 'False')
            ? 'correct-answer'
            : 'wrong-answer'
        }
        onClick={ () => {
          if (question.correct_answer === 'False') {
            localStoragePlayerInfo(timer, question.difficulty);
            showBtn();
          }
          showBtn();
        } }
      >
        False
      </button>
    );
  }

  render() {
    return (
      <>
        { this.trueButton() }
        { this.falseButton() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showBtn: () => dispatch(showNextBtn()),
});

const mapStateToProps = (state) => ({
  showAnswer: state.questionsReducer.showBtn,
  timer: state.countDownReducer.timer,
});

BooleanQuestion.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  showBtn: PropTypes.func.isRequired,
  disabled: (PropTypes.bool).isRequired,
  showAnswer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  localStoragePlayerInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanQuestion);
