import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

const Header = () =>
  <div className={css(styles.header)}>
    <h1><Link to="/">Sage</Link></h1>
    <ul className={css(styles.menu)}>
      <li><Link to="/submitform">Add Arrangement</Link></li>
    </ul>
  </div>;

const styles = StyleSheet.create({
  header: {
    background: '#3f51b5',
    display: 'flex',
  },
  menu: {
    display: 'flex',
  },
});

Header.propTypes = {
  children: PropTypes.object,
};

module.exports = Header;
