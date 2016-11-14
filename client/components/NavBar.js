import React from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { NAVBAR_WIDTH, BERMUDA_GRAY, HEATHER } from '../StyleConstants';
import menuSVG from '../icons/menu.svg';
import homeSVG from '../icons/home.svg';
import musicSVG from '../icons/music.svg';
import calendarSVG from '../icons/calendar.svg';
import manSVG from '../icons/man.svg';
import loudspeakerSVG from '../icons/loudspeaker.svg';
import cdSVG from '../icons/cd.svg';
import headphonesSVG from '../icons/headphones.svg';
import plusSVG from '../icons/plus.svg';

const NavBar = () =>
  <nav className={css(styles.nav)}>
    <ul>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: menuSVG }} /></Link>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: homeSVG }} /></Link>
      <Link to="/"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: musicSVG }} /></Link>
      <Link to="/hangovers"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: manSVG }} /></Link>
      <Link to="/semesters"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: calendarSVG }} /></Link>
      <Link to="/concerts"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: loudspeakerSVG }} /></Link>
      <Link to="/albums"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: cdSVG }} /></Link>
      <Link to="/artists"><li className={css(styles.iconLink)} dangerouslySetInnerHTML={{ __html: headphonesSVG }} /></Link>
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
