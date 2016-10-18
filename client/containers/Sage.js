import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initializeForms } from '../actions';

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
  }

  render() {
    const { children } = this.props;
    return (
      <div className="sage">
        <h1>Sage</h1>
        { children }
      </div>
    );
  }
}

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.array,
};

// for now, we don't need any state
const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Sage);
