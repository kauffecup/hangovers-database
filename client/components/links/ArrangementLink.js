import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { arrangementFormatter } from '../../normalizers/adaptFormData';

const ArrangementLink = ({ _id, name, alternateName }) =>
  <Link to={`/arrangement/${_id}`}>{arrangementFormatter({ name, alternateName })}</Link>;

ArrangementLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alternateName: PropTypes.string.isRequired,
};

export default ArrangementLink;
