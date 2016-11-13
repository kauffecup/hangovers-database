import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const arrangementLink = ({ _id, name }) =>
  <Link to={`/arrangement/${_id}`}>{name}</Link>;

arrangementLink.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default arrangementLink;
