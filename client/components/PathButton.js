import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import { MALIBU } from '../StyleConstants';

const Button = ({ text, path, styles: propStyles }) =>
  <button className={css(styles.button, propStyles)}><Link className={css(styles.link)} to={path}>{text}</Link></button>;

const styles = StyleSheet.create({
  button: {
    background: MALIBU,
    'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)',
    'border-radius': '2px',
    'min-width': '64px',
    padding: '0 16px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    'vertical-align': 'middle',
  },
  link: {
    color: '#fff',
    'text-transform': 'uppercase',
    'line-height': '36px',
    'font-family': '\'Lato\', sans-serif',
    'font-weight': 'lighter',
    'font-size': '1em',
    'text-decoration': 'none',
  },
});

Button.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  styles: PropTypes.object,
};

export default Button;
