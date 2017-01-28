import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { concertFormatter } from '../../normalizers/adaptFormData';

const ConcertLink = ({ _id, name }) =>
  <Link to={`/concerts/${_id}`}>{concertFormatter({ name })}</Link>;

ConcertLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ConcertLink;
