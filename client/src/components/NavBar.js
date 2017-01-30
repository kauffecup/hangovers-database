import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { NAVBAR_WIDTH, OXFORD_GRAY, REGENT_GRAY, SHAKESPEARE } from '../StyleConstants';
import Home from '../icons/home';
import Music from '../icons/music';
import Calendar from '../icons/calendar';
import Man from '../icons/man';
import Loudspeaker from '../icons/loudspeaker';
import Cd from '../icons/cd';
import Headphones from '../icons/headphones';
import Tag from '../icons/tag';

const NavLink = props =>
  <li className={css(styles.link)}><Link {...props} className={css(styles.svgLink)} activeClassName={css(styles.active)} /></li>

const NavBar = () =>
  <nav className={css(styles.nav)}>
    <ul>
      <li className={css(styles.link)}><Link to="/" className={css(styles.svgLink)}><Home className={css(styles.svgButton)} /></Link></li>
      <NavLink to="/arrangements"><Music className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/hangovers"><Man className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/semesters"><Calendar className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/concerts"><Loudspeaker className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/albums"><Cd className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/artists"><Headphones className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/tags"><Tag className={css(styles.svgButton)} /></NavLink>
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
  link: {
    cursor: 'pointer',
    padding: `${(NAVBAR_WIDTH - 24) / 2}px`,
  },
  active: {
    fill: '#fff',
  },
  svgLink: {
    fill: REGENT_GRAY,
    position: 'relative',
    ':hover': {
      fill: '#fff',
    },
  },
  svgButton: {
    width: '100%',
  },
});

export default NavBar;
