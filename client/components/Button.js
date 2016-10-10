import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const Button = ({ type, onClick, text }) =>
  <button type={type} onClick={onClick || (() => {})} className={css(styles.button)}>{text}</button>;

const styles = StyleSheet.create({
  button: {
    background: '#3f51b5',
    color: '#fff',
    'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)',
    'border-radius': '2px',
    'min-width': '64px',
    padding: '0 16px',
    'text-transform': 'uppercase',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    'line-height': '36px',
    'vertical-align': 'middle',
  },
});

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

module.exports = Button;
