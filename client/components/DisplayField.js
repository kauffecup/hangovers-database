import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

const DisplayField = ({ title, children, text }) => (text || children) ?
  <div>
    { typeof title === 'string' ? <span className={css(styles.title)}>{title}</span> : null }
    { typeof text === 'string' ? <span>{text}</span> : null }
    { children }
  </div> : null;

const styles = StyleSheet.create({
  title: {
    'margin-right': '3px',
  },
});

DisplayField.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default DisplayField;
