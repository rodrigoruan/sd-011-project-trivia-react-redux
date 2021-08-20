import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/Feedback.css';

class Feedback extends Component {
  renderFeedbackMessage() {
    const number = 3;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    console.log(assertions);
    if (assertions < number) {
      return (
        <h3 data-testid="feedback-text">Podia ser melhor...</h3>
      );
    }
    if (assertions >= number) return <h3 data-testid="feedback-text">Mandou bem!</h3>;
  }

  render() {
    const { score } = this.props;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header />
        <section>
          { this.renderFeedbackMessage() }
          <div>
            <p>Score: </p>
            <p data-testid="feedback-total-score">{ score }</p>
            <p>Acertos: </p>
            <p data-testid="feedback-total-question">{ assertions }</p>
            <Link to="/">
              <button type="button" data-testid="btn-play-again">Jogar novamente</button>
            </Link>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">Ver Ranking</button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.user.score,
});

Feedback.propTypes = {
  score: PropTypes.number,
}.isrequired;

export default connect(mapStateToProps)(Feedback);
