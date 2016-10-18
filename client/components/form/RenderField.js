import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import _Render from './_Render';

const _RenderField = ({ input, label, type, className }) =>
  <div className={`${className} ${css(styles['input-wrapper'])}`}>
    <input {...input} placeholder={label} type={type} className={css(styles.input)} />
  </div>;

const styles = StyleSheet.create({
  'input-wrapper': {
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
  },
});

_RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default _Render(_RenderField);
