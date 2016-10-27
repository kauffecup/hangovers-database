import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';
import { FIORD, PADDING_UNIT } from '../StyleConstants';

const Header = () =>
  <div className={css(styles.header)}>
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
});

Header.propTypes = {
  children: PropTypes.object,
};

export default Header;
