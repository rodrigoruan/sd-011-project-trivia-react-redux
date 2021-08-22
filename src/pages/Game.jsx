import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { requestApiQuestions } from '../actions';
import UserAvatar from '../components/UserAvatar';
import { cx } from '../utils';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { score: 0, success: false };
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, apiOptions } = this.props;
    const token = localStorage.getItem('token');
    dispatch(requestApiQuestions(token, apiOptions));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { success: nextProps.showBtn ? prevState.success : false };
  }

  onScoreChange(score) {
    this.setState({
      score,
      success: true,
    });
  }

  render() {
    const { score, success } = this.state;
    const {
      userName,
      history: { push },
    } = this.props;

    return (
      <>
        <img
          className="all-pages-logo"
          src="assets/logo.png"
          alt="logo trivia"
        />
        <div className="game-content">
          <div className="game-user-header">
            <div className="game-user-header-user">
              <UserAvatar className="game-user-header-avatar" />
              <div data-testid="header-player-name" className="game-user-header-name">
                {userName || 'username'}
              </div>
            </div>
            <div
              className={ cx('game-user-header-score', success && 'success') }
            >
              <span data-testid="header-score">{ score }</span>
            </div>
          </div>
          <main>
            <Question push={ push } onScoreChange={ this.onScoreChange } />
          </main>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  showBtn: state.questionsReducer.showBtn,
  apiOptions: state.questionsReducer.apiOptions,
  userName: state.loginReducer.name,
});

Game.propTypes = {
  showBtn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  apiOptions: PropTypes.shape({
    numberOfQuestions: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    questionType: PropTypes.string,
  }).isRequired,
};

Game.defaultProps = {
  userName: undefined,
};

export default connect(mapStateToProps)(Game);

// A imagem do perfil vinda do Gravatar em um elemento que deve possuir o atributo data-testid com o valor header-profile-picture
// O nome da pessoa em um elemento que deve possuir o atributo data-testid com o valor header-player-name
// O placar zerado em um elemento que deve possuir o atributo data-testid com o valor header-score
