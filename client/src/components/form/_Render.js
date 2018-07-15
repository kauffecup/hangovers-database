import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { FROLY, REGENT_GRAY, mobilize } from '../../StyleConstants';

const _Render = Component => (props) => {
  const { label, noLabel, name, styles: propStyles, meta: { touched, error } } = props; // eslint-disable-line
  return (
    <div className={css(styles.row, propStyles)}>
      {noLabel ? null : <label htmlFor={name} className={css(styles.label)}>{label}</label>}
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
    color: REGENT_GRAY,
    ...mobilize({
      'text-align': 'left',
    })
  },
  component: {
    flex: '1 1px',
    ...mobilize({
      flex: '1 100%',
    })
  },
  error: {
    flex: '1 100%',
    color: FROLY,
    'margin-left': '210px',
  },
});

export default _Render;
