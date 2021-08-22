import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getTokenApi from '../services/getTokenApi';
import { getUserData } from '../actions';
import '../Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { userName, email } = this.state;
        // REGEX VALIDATION REFERENCES
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
        // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
        const emailRegex = /[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/i;
        const checkEmail = emailRegex.test(email.toLocaleLowerCase());
        if (userName && checkEmail) {
          this.setState({
            disabled: false,
          });
        } else {
          this.setState({
            disabled: true,
          });
        }
      },
    );
  }

  async handleClick() {
    const { userName, email } = this.state;
    const { sendUserData } = this.props;
    const response = await getTokenApi();
    const { token } = response;
    localStorage.setItem('token', token);
    sendUserData(userName, email, token);
    const { history: { push } } = this.props;
    push('/game');
  }

  headerImg() {
    return (
      <img
        src="assets/logo.png"
        className="login-logo"
        alt="logo trivia star"
      />
    );
  }

  userFormLogin() {
    const { userName, email, disabled } = this.state;
    return (
      <form className="login-form">
        <label className="login-label" htmlFor="name">
          NAME:
          <input
            className="login-input"
            type="text"
            id="name"
            name="userName"
            value={ userName }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label className="login-label" htmlFor="email">
          EMAIL:
          <input
            className="login-input"
            type="text"
            id="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          className="login-button"
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ () => this.handleClick() }
        >
          PLAY
        </button>
      </form>
    );
  }

  footer() {
    return (
      <footer className="login-footer">
        <Link
          className="login-footer-link"
          data-testid="btn-settings"
          to="/settings"
        >
          SETTINGS
        </Link>
      </footer>
    );
  }

  render() {
    return (
      <div className="login-root">
        { this.headerImg() }
        { this.userFormLogin() }
        { this.footer() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendUserData: (name, email, token) => dispatch(getUserData(name, email, token)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendUserData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
