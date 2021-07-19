import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import GameTimer from '../components/GameTimer';
import Answers from '../components/Answers';
import { fetchApiTrivia, answerReset } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
    this.nextQuestionButtonClicked = this.nextQuestionButtonClicked.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  componentDidMount() {
    const { fetchTrivia } = this.props;
    const token = localStorage.getItem('token');
    if (token) fetchTrivia(token);
  }

  nextQuestionButtonClicked() {
    const { answerButtonReset } = this.props;
    this.setState((prevState) => ({ position: prevState.position + 1 }));
    answerButtonReset();
  }

  renderNextButton() {
    const { answerClicked } = this.props;
    if (answerClicked) {
      return true;
    }
    return false;
  }

  render() {
    const { results } = this.props;
    const { position } = this.state;
    const maxQuestion = 5;
    if (!results) return <h2>Carregando...</h2>;
    if (position === maxQuestion) {
      return <Redirect to="/feedback" />;
    }
    return (
      <>
        <Header />
        <p data-testid="question-category">{results[position].category}</p>
        <p data-testid="question-text">
          {results[position].question}
        </p>
        <GameTimer />
        <Answers results={ results[position] } />
        { this.renderNextButton() && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestionButtonClicked }
            style={ { padding: '10px' } }
          >
            Próxima pergunta
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.triviaReducer.trivia.results,
  answerClicked: state.gameReducer.answerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrivia: (token) => dispatch(fetchApiTrivia(token)),
  answerButtonReset: () => dispatch(answerReset()),
});

Game.propTypes = {
  results: PropTypes.object,
  answerClicked: PropTypes.bool,
  fetchTrivia: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
