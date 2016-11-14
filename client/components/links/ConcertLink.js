import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { concertFormatter } from '../../normalizers/adaptFormData';

const ConcertLink = ({ _id, name, year }) =>
  <Link to={`/concerts/${_id}`}>{concertFormatter({ name }, year)}</Link>;

ConcertLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default ConcertLink;
