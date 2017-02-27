import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { artistFormatter } from '../../normalizers/adaptFormData';

const ArtistLink = ({ _id, name }) =>
  <Link to={`/artists/${_id}`}>{artistFormatter({ name })}</Link>;

ArtistLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ArtistLink;