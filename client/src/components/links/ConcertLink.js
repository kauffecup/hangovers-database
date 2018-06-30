import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { concertFormatter } from '../../normalizers/adaptFormData';

const ConcertLink = ({ _id, name }) =>
  <Link to={`/concerts/${_id}`}>{concertFormatter({ name })}</Link>;

ConcertLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ConcertLink;
