import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Button from '../../components/Button';
import { PADDING_UNIT } from '../../StyleConstants';

const Add = ({ handleSubmit, title, children }) =>
  <div className={css(styles.full)}>
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <Button type="submit" text="Submit" />
    </form>
  </div>;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
    position: 'relative',
    '-webkit-overflow-scrolling': 'touch',
  },
});

Add.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Add;
