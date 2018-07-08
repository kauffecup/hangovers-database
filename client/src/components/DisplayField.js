import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import testChildren from '../testChildren';
import { PADDING_UNIT } from '../StyleConstants';

const DisplayField = ({ title, children, text, link }) => (text || link || testChildren(children)) ?
  <div className={css(styles.displayField)}>
    { title && !link ? <span className={css(styles.title)}>{title}</span> : null }
    { text ? <span>{text}</span> : null }
    { link ? <a href={link} target={"_blank"} rel="noopener noreferrer">{title || link}</a> : null }
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
};

export default DisplayField;
