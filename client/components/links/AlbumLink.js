import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { albumFormatter } from '../../normalizers/adaptFormData';

const AlbumLink = ({ _id, name }) =>
  <Link to={`/albums/${_id}`}>{albumFormatter({ name })}</Link>;

AlbumLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AlbumLink;
