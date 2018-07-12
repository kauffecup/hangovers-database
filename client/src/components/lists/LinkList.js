import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import Link from '../links/Link';

const LinkList = ({ title, links = [] }) =>
  <List title={title} items={links.map(link => ({ url: link }))} Component={Link} />;

LinkList.propTypes = {
  title: PropTypes.string,
  arrangementName: PropTypes.string,
  downloads: PropTypes.array,
};

export default LinkList;
