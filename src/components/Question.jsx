import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeToNextQuestion,
  resetCountdown,
  tickCountdown,
  showNextBtn,
} from '../actions';
import QuestionHeader from './QuestionHeader';
import BooleanQuestion from './BooleanQuestion';
import MultipleChoice from './MultipleChoice';
import Loading from './Loading';
import './Question.css';

const INTERVAL = 1000;
class Question extends React.Component {
  componentDidMount() {
    const { userName, userEmail } = this.props;
    const state = {
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    this.startCounter();
    this.localStoragePlayerInfo = this.localStoragePlayerInfo.bind(this);
  }

  componentDidUpdate() {
    const { timer, showBtn, showNextButton } = this.props;

    if (timer === 0 || showBtn) {
      this.stopCountDown();
      showNextButton();
    }
  }

  componentWillUnmount() {
    this.stopCountDown();
  }

  localStoragePlayerInfo(timer, difficulty) {
    const { onScoreChange } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));

    const startScore = 10;
    const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
    if (difficulty === 'hard') {
      state.player.score += startScore + difficultyLevel.hard * timer;
      state.player.assertions += 1;
    }
    if (difficulty === 'medium') {
      state.player.score += startScore + difficultyLevel.medium * timer;
      state.player.assertions += 1;
    }
    if (difficulty === 'easy') {
      state.player.score += startScore + difficultyLevel.easy * timer;
      state.player.assertions += 1;
    }

    localStorage.setItem('state', JSON.stringify(state));

    onScoreChange(state.player.score);
  }

  startCounter() {
    const { resetCounter, tickCounter } = this.props;

    resetCounter();
    this.interval = setInterval(() => tickCounter(), INTERVAL);
  }

  stopCountDown() {
    clearInterval(this.interval);
  }

  render() {
    const { questions, showBtn, currentQuestion, nextQuestion, push } = this.props;
    const maxQuestions = questions.length - 1;
    return (
      <section className="game-card">
        {questions[currentQuestion] ? (
          <>
            <QuestionHeader question={ questions[currentQuestion] } />
            <div className="answer-options">
              {questions[currentQuestion].type === 'boolean' ? (
                <BooleanQuestion
                  disabled={ showBtn }
                  question={ questions[currentQuestion] }
                  localStoragePlayerInfo={ this.localStoragePlayerInfo }
                />
              ) : (
                <MultipleChoice
                  disabled={ showBtn }
                  question={ questions[currentQuestion] }
                  localStoragePlayerInfo={ this.localStoragePlayerInfo }
                />
              )}
            </div>
            <button
              data-testid="btn-next"
              type="button"
              className={ showBtn ? 'pretty-button show-btn' : 'hide-btn' }
              onClick={ () => {
                if (currentQuestion === maxQuestions) {
                  push('/feedback');
                } else {
                  this.startCounter();
                  nextQuestion();
                }
              } }
            >
              NEXT QUESTION
            </button>
          </>
        ) : (
          <Loading />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.results,
  showBtn: state.questionsReducer.showBtn,
  currentQuestion: state.questionsReducer.currentQuestion,
  timer: state.countDownReducer.timer,
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(changeToNextQuestion()),
  resetCounter: () => dispatch(resetCountdown()),
  tickCounter: () => dispatch(tickCountdown()),
  showNextButton: () => dispatch(showNextBtn()),
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  showBtn: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  resetCounter: PropTypes.func.isRequired,
  tickCounter: PropTypes.func.isRequired,
  showNextButton: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

Question.defaultProps = {
  questions: [{}],
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
