import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import ConcertLink from '../links/ConcertLink';

const ConcertList = ({ title, concerts = [] }) =>
  <List title={title} items={concerts} Component={ConcertLink} />;

ConcertList.propTypes = {
  title: PropTypes.string,
  concerts: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default ConcertList;
