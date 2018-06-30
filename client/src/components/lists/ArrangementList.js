import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import ArrangementLink from '../links/ArrangementLink';

const ArrangementList = ({ title, arrangements = [] }) =>
  <List title={title} items={arrangements} Component={ArrangementLink} />;

ArrangementList.propTypes = {
  title: PropTypes.string,
  arrangements: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default ArrangementList;
