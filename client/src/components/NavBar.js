import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Music from '../icons/music';
import Calendar from '../icons/calendar';
import Man from '../icons/man';
import Loudspeaker from '../icons/loudspeaker';
import Cd from '../icons/cd';
import Headphones from '../icons/headphones';
import Tag from '../icons/tag';
import {
  NAVBAR_WIDTH,
  OXFORD_GRAY,
  REGENT_GRAY,
  BLACK_SQUEEZE,
  SHAKESPEARE,
} from '../StyleConstants';

const NavLink = props =>
  <li className={css(styles.link)}><Link {...props} className={css(styles.svgLink)} activeClassName={css(styles.active)} /></li>

const NavBar = ({ onLogout }) =>
  <nav className={css(styles.nav)}>
    <ul className={css(styles.list)}>
      <NavLink to="/arrangements"><Music className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/hangovers"><Man className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/semesters"><Calendar className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/concerts"><Loudspeaker className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/albums"><Cd className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/artists"><Headphones className={css(styles.svgButton)} /></NavLink>
      <NavLink to="/tags"><Tag className={css(styles.svgButton)} /></NavLink>
      <a onClick={onLogout} className={css(styles.link) + ' ' + css(styles.logout)}>Log Out</a>
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
  list: {
    display: 'flex',
    'flex-direction': 'column',
  },
  link: {
    cursor: 'pointer',
    padding: `${(NAVBAR_WIDTH - 24) / 2}px`,
  },
  logout: {
    color: BLACK_SQUEEZE,
    padding: '0 0 22px 0',
    margin: 'auto',
    ':hover': {
      color: SHAKESPEARE,
    },
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
