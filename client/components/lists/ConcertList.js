import React, { PropTypes } from 'react';
import List from './_List';
import ConcertLink from '../links/ConcertLink';

const ConcertList = ({ title, concerts = [] }) =>
  <List title={title} items={concerts} Component={ConcertLink} />;

ConcertList.propTypes = {
  title: PropTypes.string,
  concerts: PropTypes.array,
};

export default ConcertList;
