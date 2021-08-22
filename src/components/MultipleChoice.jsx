import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNextBtn } from '../actions';
import { decodeHtml } from '../utils';

class MultipleChoice extends React.Component {
  render() {
    const {
      question,
      showBtn,
      disabled,
      showAnswer,
      localStoragePlayerInfo,
      timer,
    } = this.props;
    return question.answers.map((answer, index) => {
      if (question.correct_answer === answer) {
        return (
          <button
            className={ showAnswer ? 'show-correct-answer' : null }
            disabled={ disabled }
            data-testid="correct-answer"
            key={ index }
            type="button"
            onClick={ () => {
              localStoragePlayerInfo(timer, question.difficulty);
              showBtn();
            } }
          >
            {decodeHtml(answer)}
          </button>
        );
      }
      return (
        <button
          className={ showAnswer ? 'show-incorrect-answer' : null }
          disabled={ disabled }
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          type="button"
          onClick={ () => showBtn() }
        >
          {decodeHtml(answer)}
        </button>
      );
    });
  }
}
const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
  showAnswer: state.questionsReducer.showBtn,
  timer: state.countDownReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  showBtn: () => dispatch(showNextBtn()),
});

MultipleChoice.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  showBtn: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  localStoragePlayerInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);
