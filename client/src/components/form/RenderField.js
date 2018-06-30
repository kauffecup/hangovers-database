import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import _Render from './_Render';

const _RenderField = ({ input, label, type, className, autoComplete }) =>
  <div className={`${className} ${css(styles.inputWrapper)}`}>
    <input {...input} placeholder={label} type={type} autoComplete={autoComplete} className={css(styles.input)} />
  </div>;

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    height: '36px',
    border: '1px solid #d9d9d9',
    'border-radius': '4px',
  },
  input: {
    flex: 1,
    height: '100%',
    border: 'none',
    padding: '0px 10px',
    'font-family': '\'Lato\', sans-serif',
    'font-weight': 'lighter',
    'font-size': '1em',
  },
});

_RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default _Render(_RenderField);
