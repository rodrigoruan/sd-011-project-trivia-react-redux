import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTokenApi } from '../actions/index';
import logo from '../trivia.png';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };
    this.changeState = this.changeState.bind(this);
    this.getTokenFromApi = this.getTokenFromApi.bind(this);
  }

  getTokenFromApi() {
    const { getToken } = this.props;
    const { email, name } = this.state;
    getToken();
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        },
      }),
    );
  }

  changeState({ target: { id, value } }) {
    const { name, email } = this.state;
    this.setState({ [id]: value });
    if (name && email) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled, email, name } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <input
            className="input-text"
            data-testid="input-gravatar-email"
            type="email"
            placeholder="Email"
            id="email"
            value={ email }
            onChange={ this.changeState }
          />
          <input
            className="input-text"
            data-testid="input-player-name"
            type="text"
            placeholder="Name"
            id="name"
            value={ name }
            onChange={ this.changeState }
          />
          <Link to="/game">
            <button
              className="enter-button"
              disabled={ disabled }
              type="button"
              data-testid="btn-play"
              onClick={ this.getTokenFromApi }
            >
              Jogar
            </button>
          </Link>
          <Link
            className="configuration"
            data-testid="btn-settings"
            to="/settings"
          >
            Configurações
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchTokenApi()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};
