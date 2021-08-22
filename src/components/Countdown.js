import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Countdown extends React.Component {
  render() {
    const dangerTime = 10;
    const { timer } = this.props;
    return (
      <div>
        <h3 className={ timer <= dangerTime ? 'timer timer-danger' : 'timer' }>
          {timer}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.countDownReducer.timer,
});

Countdown.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Countdown);
