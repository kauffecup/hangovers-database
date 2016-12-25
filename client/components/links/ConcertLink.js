import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { concertFormatter } from '../../normalizers/adaptFormData';

const ConcertLink = ({ _id, name, semester }) =>
  <Link to={`/concerts/${_id}`}>{concertFormatter({ name, semester })}</Link>;

ConcertLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  semester: PropTypes.object.isRequired,
};

export default ConcertLink;
