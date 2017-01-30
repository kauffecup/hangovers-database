import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { NAVBAR_WIDTH, OXFORD_GRAY, REGENT_GRAY } from '../StyleConstants';
import Home from '../icons/home';
import Music from '../icons/music';
import Calendar from '../icons/calendar';
import Man from '../icons/man';
import Loudspeaker from '../icons/loudspeaker';
import Cd from '../icons/cd';
import Headphones from '../icons/headphones';
import Tag from '../icons/tag';

const NavBar = () =>
  <nav className={css(styles.nav)}>
    <ul>
      <Link to="/"><li className={css(styles.iconLink)}><Home className={css(styles.svgButton)} /></li></Link>
      <Link to="/"><li className={css(styles.iconLink)}><Music className={css(styles.svgButton)} /></li></Link>
      <Link to="/hangovers"><li className={css(styles.iconLink)}><Man className={css(styles.svgButton)} /></li></Link>
      <Link to="/semesters"><li className={css(styles.iconLink)}><Calendar className={css(styles.svgButton)} /></li></Link>
      <Link to="/concerts"><li className={css(styles.iconLink)}><Loudspeaker className={css(styles.svgButton)} /></li></Link>
      <Link to="/albums"><li className={css(styles.iconLink)}><Cd className={css(styles.svgButton)} /></li></Link>
      <Link to="/artists"><li className={css(styles.iconLink)}><Headphones className={css(styles.svgButton)} /></li></Link>
      <Link to="/tags"><li className={css(styles.iconLink)}><Tag className={css(styles.svgButton)} /></li></Link>
    </ul>
  </nav>;

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${NAVBAR_WIDTH}px`,
    background: OXFORD_GRAY,
    overflow: 'auto',
    'padding-top': `${NAVBAR_WIDTH}px`,
    '-webkit-overflow-scrolling': 'touch',
  },
  iconLink: {
    cursor: 'pointer',
    padding: `${(NAVBAR_WIDTH - 24) / 2}px`,
  },
  svgButton: {
    width: '100%',
    fill: REGENT_GRAY,
  },
});

export default NavBar;
