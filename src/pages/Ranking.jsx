import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { restartGame } from '../actions';
import RankingCard from '../components/RankingCard';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    const { userName, gravatarImage } = props;

    const state = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    const newRankingPosition = {
      name: userName,
      score: state.player.score,
      picture: gravatarImage,
    };

    if (ranking) {
      const newRanking = [...ranking, newRankingPosition];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([newRankingPosition]));
    }
  }

  render() {
    const { playAgain } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <img
          className="all-pages-logo"
          src="assets/logo.png"
          alt="logo trivia"
        />
        <header>
          <h1 className="pretty-title" data-testid="ranking-title">
            Ranking
          </h1>
        </header>
        <main>
          {ranking ? (
            <ul className="ranking-list">
              {ranking
                .sort((a, b) => b.score - a.score)
                .map((item, index) => (
                  <li key={ index }>
                    <RankingCard
                      userName={ item.name }
                      gravatarImage={ item.picture }
                      score={ item.score }
                    />
                  </li>
                ))}
            </ul>
          ) : (
            <div>Loading...</div>
          )}
          <Link
            className="pretty-button"
            data-testid="btn-go-home"
            to="/"
            onClick={ () => playAgain() }
          >
            Home
          </Link>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  gravatarImage: state.loginReducer.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(restartGame()),
});

Ranking.propTypes = {
  userName: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
  playAgain: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
