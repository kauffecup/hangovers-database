import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { albumFormatter } from '../../normalizers/adaptFormData';

const AlbumLink = ({ _id, name, semester }) =>
  <Link to={`/albums/${_id}`}>{albumFormatter({ name, semester })}</Link>;

AlbumLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  semester: PropTypes.object.isRequired,
};

export default AlbumLink;
