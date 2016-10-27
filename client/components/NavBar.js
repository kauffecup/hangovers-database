import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { NAVBAR_WIDTH, BERMUDA_GRAY, HEATHER } from '../StyleConstants';
import menuSVG from '../icons/menu.svg';
import homeSVG from '../icons/home.svg';
import audioSVG from '../icons/audio.svg';
import plusSVG from '../icons/plus.svg';

const NavBar = () =>
  <nav className={css(styles.nav)}>
    <ul>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: menuSVG }} /></Link>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: homeSVG }} /></Link>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: audioSVG }} /></Link>
      <Link to="/submitform"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: plusSVG }} /></Link>
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
  },
  iconLink: {
    fill: HEATHER,
    cursor: 'pointer',
    padding: `${(NAVBAR_WIDTH - 24) / 2}px`,
  },
});

export default NavBar;
