import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ATLANTIS, PEPPERMINT, BRIGHT_TURQUOISE, FROLY } from '../StyleConstants';

const Button = ({ type, handleClick, text, simple, success, error }) =>
  <button
    type={type}
    onClick={handleClick || (() => {})}
    className={css(
      styles.button,
      !simple && styles.notSimple,
      success && styles.success,
      error && styles.error,
    )}
  >
    {text}
  </button>;

const styles = StyleSheet.create({
  button: {
    background: BRIGHT_TURQUOISE,
    color: '#fff',
    padding: '0 16px',
    'text-transform': 'uppercase',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    'line-height': '36px',
    'vertical-align': 'middle',
    'font-family': '\'Lato\', sans-serif',
    'font-weight': 'lighter',
    'font-size': '1em',
  },
  notSimple: {
    'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)',
    'min-width': '64px',
    'border-radius': '2px',
  },
  success: {
    background: PEPPERMINT,
    color: ATLANTIS,
  },
  error: {
    background: FROLY,
  },
});

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string,
  simple: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

export default Button;
