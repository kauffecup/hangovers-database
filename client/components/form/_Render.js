import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const _Render = Component => (props) => {
  const { label, name, styles: propStyles, meta: { touched, error } } = props; // eslint-disable-line
  return (
    <div className={css(styles.row, propStyles)}>
      <label htmlFor={name} className={css(styles.label)}>{label}</label>
      <Component {...props} className={css(styles.component)} />
      {touched && error && <div className={css(styles.error)}>{error}</div>}
    </div>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    'align-items': 'center',
    padding: '5px',
    'flex-wrap': 'wrap',
  },
  label: {
    width: '200px',
    'text-align': 'right',
    'margin-right': '10px',
  },
  component: {
    flex: '1 1px',
  },
  error: {
    flex: '1 100%',
    color: 'red',
    'margin-left': '210px',
  },
});

export default _Render;
