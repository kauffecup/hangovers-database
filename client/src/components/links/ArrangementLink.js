import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { arrangementFormatter } from '../../normalizers/adaptFormData';

const ArrangementLink = ({ _id, name, alternateName }) =>
  <Link to={`/arrangements/${_id}`}>{arrangementFormatter({ name, alternateName })}</Link>;

ArrangementLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alternateName: PropTypes.string,
};

export default ArrangementLink;
