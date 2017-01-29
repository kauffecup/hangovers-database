import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { closeBanner, initializeForms, toggleNavBar } from '../actions';
import { BLACK_SQUEEZE, NAVBAR_WIDTH } from '../StyleConstants';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
  }

  render() {
    const { banner, children, dispatch, view } = this.props;
    const { open: bannerOpen, text: bannerText, type: bannerType } = banner;
    const { navBarOpen } = view;
    return (
      <div className={css(styles.sage)}>
        <div className={css(styles.notNavBar, !navBarOpen && styles.navBarClosed)}>
          <Header navBarOpen={navBarOpen} handleHamburger={() => dispatch(toggleNavBar())} />
          { bannerOpen ? <Banner text={bannerText} type={bannerType} handleClose={() => dispatch(closeBanner())} /> : null }
          { children }
        </div>
        { navBarOpen ? <NavBar handleHamburger={() => dispatch(toggleNavBar())} /> : null }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  sage: {
    background: BLACK_SQUEEZE,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
  },
  notNavBar: {
    'padding-left': `${NAVBAR_WIDTH}px`,
    height: '100%',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
  },
  navBarClosed: {
    'padding-left': 0,
  },
});

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  banner: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

// use the banner state
const mapStateToProps = ({ banner, view }) => ({ banner, view });

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Sage);
