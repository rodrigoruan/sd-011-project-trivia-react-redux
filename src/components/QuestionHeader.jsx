import React from 'react';
import PropTypes from 'prop-types';
import Countdown from './Countdown';
import { decodeHtml } from '../utils';

class QuestionHeader extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <header className="question-header">
        <div
          data-testid="question-category"
          className="question-header-category"
        >
          {decodeHtml(question.category)}
        </div>
        <div data-testid="question-text" className="question-header-question">
          {decodeHtml(question.question)}
        </div>
        <div className="question-header-countdown-wrapper">
          <Countdown />
        </div>
      </header>
    );
  }
}

QuestionHeader.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default QuestionHeader;
