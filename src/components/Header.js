import React, { Component } from 'react';
import '../css/Header.css';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
      name: '',
    };
  }

  componentDidMount() {
    this.transformGravatar();
  }

  transformGravatar() {
    const store = JSON.parse(localStorage.getItem('state'));
    const hashEmail = md5(store.player.email).toString();
    const { name } = store.player;
    this.setState({ gravatar: hashEmail, name });
  }

  render() {
    const { gravatar, name } = this.state;
    const storage = JSON.parse(localStorage.getItem('state'));
    const { score } = storage.player;
    return (
      <div className="header-container">
        <img
          className="gravatar-game"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span className="name-header" data-testid="header-player-name">{name}</span>
        <p className="score" data-testid="header-score">{`Score: ${score}`}</p>
      </div>
    );
  }
}

export default Header;
