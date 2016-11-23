import React, { PropTypes } from 'react';
import List from './_List';
import HangoverLink from '../links/HangoverLink';

const HangoverList = ({ title, hangovers = [] }) =>
  <List title={title} items={hangovers} Component={HangoverLink} />;

HangoverList.propTypes = {
  title: PropTypes.string,
  hangovers: PropTypes.array,
};

export default HangoverList;