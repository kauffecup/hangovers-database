import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { PADDING_UNIT } from '../StyleConstants';
import testChildren from '../testChildren';

const DisplayField = ({ title, children }) => testChildren(children) ?
  <div className={css(styles.card)}>
    { typeof title === 'string' ? <h3>{title}</h3> : null }
    { children }
  </div> : null;

const styles = StyleSheet.create({
  card: {
    background: '#fff',
    'box-shadow': '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)',
    'border-radius': '5px',
    padding: `${PADDING_UNIT}px`,
    'margin': `${PADDING_UNIT}px 0px`,
  },
});

DisplayField.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default DisplayField;
