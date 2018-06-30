import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import _Render from './_Render';

const _RenderTextArea = ({ input, className }) =>
  <div className={`${className} ${css(styles.inputWrapper)}`}>
    <textarea {...input} className={css(styles.input)} />
  </div>;

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    border: '1px solid #d9d9d9',
    'border-radius': '4px',
  },
  input: {
    flex: 1,
    height: '100px',
    'max-height': '100px',
    'max-width': '100%',
    border: 'none',
    padding: '10px',
    'font-family': '\'Lato\', sans-serif',
    'font-weight': 'lighter',
    'font-size': '1em',
  },
});

_RenderTextArea.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default _Render(_RenderTextArea);
