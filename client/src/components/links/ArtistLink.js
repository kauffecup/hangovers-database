import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { artistFormatter } from '../../normalizers/adaptFormData';

const ArtistLink = ({ _id, name }) =>
  <Link to={`/artists/${_id}`}>{artistFormatter({ name })}</Link>;

ArtistLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ArtistLink;
