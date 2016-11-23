import React, { PropTypes } from 'react';
import List from './_List';
import ArtistLink from '../links/ArtistLink';

const ArtistList = ({ title, artists = [] }) =>
  <List title={title} items={artists} Component={ArtistLink} />;

ArtistList.propTypes = {
  title: PropTypes.string,
  artists: PropTypes.array,
};

export default ArtistList;
