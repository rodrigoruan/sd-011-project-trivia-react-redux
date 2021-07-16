import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchToken, { fetchGravatar } from '../services/Api';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { user, email } = this.state;
      if (user.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      }
    });
  }

  handleClick() {
    const { user, email } = this.state;
    const { history } = this.props;
    fetchToken()

      .then(() => fetchGravatar(email, user))
      .then(() => history.push('/gameplay'));
  }

  render() {
    const { isDisabled, user, email } = this.state;
    return (
      <div>
        <h1>Trivia</h1>
        <input
          type="text"
          name="user"
          value={ user }
          placeholder="nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
};