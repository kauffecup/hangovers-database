import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import HangoverLink from '../links/HangoverLink';

const HangoverList = ({ title, hangovers = [] }) =>
  <List title={title} items={hangovers} Component={HangoverLink} />;

HangoverList.propTypes = {
  title: PropTypes.string,
  hangovers: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default HangoverList;
