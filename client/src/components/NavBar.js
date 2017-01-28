import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { NAVBAR_WIDTH, BERMUDA_GRAY, HEATHER } from '../StyleConstants';
import Menu from '../icons/menu';
import Home from '../icons/home';
import Music from '../icons/music';
import Calendar from '../icons/calendar';
import Man from '../icons/man';
import Loudspeaker from '../icons/loudspeaker';
import Cd from '../icons/cd';
import Headphones from '../icons/headphones';
import Tag from '../icons/tag';

const NavBar = ({ handleHamburger }) =>
  <nav className={css(styles.nav)}>
    <ul>
      <button onClick={() => handleHamburger()} className={css(styles.iconLink)}><Menu fill={HEATHER} className={css(styles.svgButton)} /></button>
      <Link to="/"><li className={css(styles.iconLink)}><Home fill={HEATHER} /></li></Link>
      <Link to="/"><li className={css(styles.iconLink)}><Music fill={HEATHER} /></li></Link>
      <Link to="/hangovers"><li className={css(styles.iconLink)}><Man fill={HEATHER} /></li></Link>
      <Link to="/semesters"><li className={css(styles.iconLink)}><Calendar fill={HEATHER} /></li></Link>
      <Link to="/concerts"><li className={css(styles.iconLink)}><Loudspeaker fill={HEATHER} /></li></Link>
      <Link to="/albums"><li className={css(styles.iconLink)}><Cd fill={HEATHER} /></li></Link>
      <Link to="/artists"><li className={css(styles.iconLink)}><Headphones fill={HEATHER} /></li></Link>
      <Link to="/tags"><li className={css(styles.iconLink)}><Tag fill={HEATHER} /></li></Link>
    </ul>
  </nav>;

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${NAVBAR_WIDTH}px`,
    background: BERMUDA_GRAY,
    overflow: 'auto',
  },
  iconLink: {
    cursor: 'pointer',
    padding: `${(NAVBAR_WIDTH - 24) / 2}px`,
  },
  svgButton: {
    width: '24px',
    height: '24px',
  }
});

NavBar.propTypes = {
  handleHamburger: PropTypes.func.isRequired,
};

export default NavBar;
