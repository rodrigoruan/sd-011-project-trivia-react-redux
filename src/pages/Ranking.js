import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Ranking.css';

export default class Ranking extends Component {
  render() {
    const rankingData = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = rankingData.sort((a, b) => b.score - a.score);

    return (
      <div>
        <header data-testid="ranking-title" className="header-ranking">
          <p>Ranking</p>
        </header>

        <div className="ranking-data-container">
          <ul>
            {sortedRanking.map((userRank, index) => (
              <li key={ index } className="ranking-card">
                <img
                  src={ userRank.picture }
                  alt="foto do usuario"
                  className="user-image"
                />
                <h2 data-testid={ `player-name-${index}` }>{ userRank.name }</h2>
                <h2 data-testid={ `player-score-${index}` }>{ userRank.score }</h2>
              </li>))}
          </ul>
        </div>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="button-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}
