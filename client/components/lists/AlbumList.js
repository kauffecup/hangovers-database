import React, { PropTypes } from 'react';
import List from './_List';
import AlbumLink from '../links/AlbumLink';

const AlbumList = ({ title, albums = [] }) =>
  <List title={title} items={albums} Component={AlbumLink} />;

AlbumList.propTypes = {
  title: PropTypes.string,
  albums: PropTypes.array,
};

export default AlbumList;
