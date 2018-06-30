import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import AlbumLink from '../links/AlbumLink';

const AlbumList = ({ title, albums = [] }) =>
  <List title={title} items={albums} Component={AlbumLink} />;

AlbumList.propTypes = {
  title: PropTypes.string,
  albums: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default AlbumList;
