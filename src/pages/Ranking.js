import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Ranking.css';

export default class Ranking extends Component {
  render() {
    const rankingData = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = rankingData.sort((a, b) => b.score - a.score);

    return (
      <div className="Ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {sortedRanking.map((userRank, index) => (
            <li key={ index }>
              <img src={ userRank.picture } alt="foto do usuario" />
              <h2 data-testid={ `player-name-${index}` }>{ userRank.name }</h2>
              <h2 data-testid={ `player-score-${index}` }>{ userRank.score }</h2>
            </li>))}
        </ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}
