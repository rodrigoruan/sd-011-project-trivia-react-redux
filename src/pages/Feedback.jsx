import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Feedback.css';
import RankingCard from '../components/RankingCard';

class Feedback extends React.Component {
  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const NUMBER_TREE = 3;
    if (state.player.assertions < NUMBER_TREE) {
      return 'You\'ll do better next time!';
    }
    return 'VERY GOOD!';
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { userName, gravatarImage } = this.props;
    return (
      <>
        <img
          className="all-pages-logo"
          src="assets/logo.png"
          alt="logo trivia"
        />

        <RankingCard
          userName={ userName }
          gravatarImage={ gravatarImage }
          score={ state.player.score }
          assertions={ state.player.assertions }
        />
        <p className="feedback-message" data-testid="feedback-text">
          {this.feedbackMessage()}
        </p>
        <div className="feedback-buttons">
          <Link
            className="pretty-button"
            data-testid="btn-ranking"
            to="/ranking"
          >
            Ranking
          </Link>
          <Link to="/">
            <button
              className="pretty-button"
              type="button"
              data-testid="btn-play-again"
            >
              Play Again!
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
