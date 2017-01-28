import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { tagFormatter } from '../../normalizers/adaptFormData';

const TagLink = ({ _id, name }) =>
  <Link to={`/tags/${_id}`}>{tagFormatter({ name })}</Link>;

TagLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TagLink;
