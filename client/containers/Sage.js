import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initializeForms, getArrangements } from '../actions';
import Header from '../components/Header';

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
    dispatch(getArrangements());
  }

  render() {
    const { children } = this.props;
    return (
      <div className="sage">
        <Header />
        { children }
      </div>
    );
  }
}

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

// for now, we don't need any state
const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Sage);
