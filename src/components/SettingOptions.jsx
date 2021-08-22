import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categories, difficultyLevels, questionsTypes } from '../services/apiSettings';
import { selectAPIOptions } from '../actions';

class SettingOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfQuestions: '5',
      category: '',
      difficulty: '',
      questionType: '',
    };

    this.handleOptions = this.handleOptions.bind(this);
  }

  handleOptions({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  sendSettings() {
    const { dispatch, push } = this.props;
    const {
      numberOfQuestions,
      category,
      difficulty,
      questionType,
    } = this.state;

    dispatch(selectAPIOptions(numberOfQuestions, category, difficulty, questionType));
    push('/');
  }

  render() {
    const { numberOfQuestions } = this.state;
    return (
      <div>
        <label htmlFor="number-of-questions">
          Number of Questions:
          <input
            id="number-of-questions"
            max="50"
            min="1"
            name="numberOfQuestions"
            onChange={ this.handleOptions }
            type="number"
            value={ numberOfQuestions }
          />
        </label>
        <label htmlFor="select-category">
          Select Category:
          <select id="select-category" name="category" onChange={ this.handleOptions }>
            { categories.map(({ category, value }) => (
              <option key={ value } value={ value }>{ category }</option>)) }
          </select>
        </label>
        <label htmlFor="difficulty">
          Select Difficulty:
          <select id="difficulty" name="difficulty" onChange={ this.handleOptions }>
            { difficultyLevels.map(({ difficulty, value }) => (
              <option key={ value } value={ value }>{ difficulty }</option>)) }
          </select>
        </label>
        <label htmlFor="type">
          Select Type:
          <select id="type" name="questionType" onChange={ this.handleOptions }>
            { questionsTypes.map(({ type, value }) => (
              <option key={ value } value={ value }>{ type }</option>)) }
          </select>
        </label>
        <button
          className="pretty-button"
          type="button"
          onClick={ () => this.sendSettings() }
        >
          Send
        </button>
      </div>
    );
  }
}

SettingOptions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect()(SettingOptions);
