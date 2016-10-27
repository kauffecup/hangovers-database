import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { initializeForms, getArrangements } from '../actions';
import { CATSKILL_WHITE, NAVBAR_WIDTH } from '../StyleConstants';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
    dispatch(getArrangements());
  }

  render() {
    const { children } = this.props;
    return (
      <div className={css(styles.sage)}>
        <div className={css(styles.notNavBar)}>
          <Header />
          { children }
        </div>
        <NavBar />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  sage: {
    background: CATSKILL_WHITE,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  notNavBar: {
    'padding-left': `${NAVBAR_WIDTH}px`,
    height: '100%',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
  },
});

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

// for now, we don't need any state
const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Sage);
