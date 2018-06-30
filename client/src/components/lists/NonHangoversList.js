import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import NonHangoverLink from '../links/NonHangoverLink';

const NonHangoversList = ({ title, nonHangovers = [] }) =>
  <List title={title} items={nonHangovers} Component={NonHangoverLink} />;

NonHangoversList.propTypes = {
  title: PropTypes.string,
  nonHangovers: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default NonHangoversList;
