import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import testChildren from '../testChildren';

const DisplayField = ({ title, children, text, link }) => (text || link || testChildren(children)) ?
  <div>
    { title && !link ? <span className={css(styles.title)}>{title}</span> : null }
    { text ? <span>{text}</span> : null }
    { link ? <a href={link} target="_blank" rel="noopener noreferrer">{title || link}</a> : null }
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
  link: PropTypes.string,
  children: PropTypes.node,
};

export default DisplayField;
