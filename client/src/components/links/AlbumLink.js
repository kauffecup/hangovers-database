import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { albumFormatter } from '../../normalizers/adaptFormData';

const AlbumLink = ({ _id, name }) =>
  <Link to={`/albums/${_id}`}>{albumFormatter({ name })}</Link>;

AlbumLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AlbumLink;
