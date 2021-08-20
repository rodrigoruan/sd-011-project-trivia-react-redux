import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions } from '../redux/actions';
import '../css/Game.css';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      getQuestions(token);
    } else {
      getQuestions('');
    }
  }

  render() {
    const { loading, questionsArr } = this.props;
    if (!questionsArr.length) return (<div>Loading</div>);
    if (loading) return <h3>Loading</h3>;
    return (
      <div>
        <Header />
        <div className="game">
          <Question />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.questions.loading,
  questionsArr: state.questions.questionsArr,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  getQuestions: PropTypes.func,
  loading: PropTypes.bool,
}.isrequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
