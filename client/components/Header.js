import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { FIORD, PADDING_UNIT, NAVBAR_WIDTH, HEATHER } from '../StyleConstants';
import menuSVG from '../icons/menu.svg';

const Header = ({ navBarOpen, handleHamburger }) =>
  <div className={css(styles.header)}>
    { navBarOpen ? null : <button onClick={() => handleHamburger()} className={css(styles.hamburger)} dangerouslySetInnerHTML={{ __html: menuSVG }} /> }
    <h1><Link className={css(styles.title)} to="/">Sage</Link></h1>
  </div>;

const styles = StyleSheet.create({
  header: {
    background: '#fff',
    display: 'flex',
    height: '80px',
    'align-items': 'center',
    padding: `0px ${PADDING_UNIT}px`,
  },
  title: {
    color: FIORD,
    'text-decoration': 'none',
  },
  hamburger: {
    fill: HEATHER,
    cursor: 'pointer',
    'padding-left': `${((NAVBAR_WIDTH - 24) / 2) - PADDING_UNIT}px`,
    'padding-right': `${((NAVBAR_WIDTH - 24) / 2) + PADDING_UNIT}px`,
  },
});

Header.propTypes = {
  navBarOpen: PropTypes.bool.isRequired,
  handleHamburger: PropTypes.func.isRequired,
};

export default Header;
