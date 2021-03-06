import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { OXFORD_GRAY, PADDING_UNIT, REGENT_GRAY } from '../StyleConstants';
import Menu from '../icons/menu';

const Header = ({ handleHamburger }) =>
  <div className={css(styles.header)}>
    <button onClick={() => handleHamburger()} className={css(styles.hamburger)}><Menu className={css(styles.svgButton)} /></button>
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
    color: OXFORD_GRAY,
    'text-decoration': 'none',
  },
  hamburger: {
    cursor: 'pointer',
    'padding-right': `${PADDING_UNIT}px`,
  },
  svgButton: {
    fill: REGENT_GRAY,
    width: '24px',
  },
});

Header.propTypes = {
  handleHamburger: PropTypes.func.isRequired,
};

export default Header;
