import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { BANNER_SUCCESS, BANNER_ERROR } from '../actions';
import Button from './Button';
import {
  PADDING_UNIT,
  ATLANTIS,
  PEPPERMINT,
  FROLY,
} from '../StyleConstants';

const Banner = ({ text, type, handleClose }) =>
  <div className={css(styles.banner, styles[type])}>
    <span className={css(styles.text)}>{text}</span>
    <Button
      text="x"
      handleClick={handleClose || (() => {})}
      success={type === BANNER_SUCCESS}
      error={type === BANNER_ERROR}
      simple
    />
  </div>;

const styles = StyleSheet.create({
  banner: {
    display: 'flex',
    'justify-content': 'space-between',
    padding: `${PADDING_UNIT}px`,
    'align-items': 'center',
  },
  text: {},
  [BANNER_SUCCESS]: {
    background: PEPPERMINT,
    color: ATLANTIS,
  },
  [BANNER_ERROR]: {
    background: FROLY,
    color: '#fff',
  },
});

Banner.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  handleClose: PropTypes.func,
};

export default Banner;
