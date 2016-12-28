import React, { PropTypes } from 'react';
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
    padding: `${PADDING_UNIT / 2}px`,
    'margin-bottom': `${PADDING_UNIT / 2}px`,
    'margin-top': `${PADDING_UNIT / 2}px`,
  },
});

DisplayField.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default DisplayField;
