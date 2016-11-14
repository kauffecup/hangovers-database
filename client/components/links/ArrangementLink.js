import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ArrangementLink = ({ _id, name }) =>
  <Link to={`/arrangement/${_id}`}>{name}</Link>;

ArrangementLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ArrangementLink;
