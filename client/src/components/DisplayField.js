import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import testChildren from '../testChildren';
import { PADDING_UNIT } from '../StyleConstants';

const DisplayField = ({ title, children, text, link, download }) => (text || link || testChildren(children)) ?
  <div className={css(styles.displayField)}>
    { title && !link ? <span className={css(styles.title)}>{title}</span> : null }
    { text ? <span>{text}</span> : null }
    { link ? <a href={link} target="_blank" rel="noopener noreferrer" download={download}>{title || link}</a> : null }
    { children }
  </div> : null;

const styles = StyleSheet.create({
  displayField: {
    padding: `${PADDING_UNIT / 4}px 0px`,
  },
  title: {
    'margin-right': '3px',
    'font-weight': 'bold',
  },
});

DisplayField.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node,
  download: PropTypes.boolean,
};

export default DisplayField;
