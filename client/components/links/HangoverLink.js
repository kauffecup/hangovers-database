import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { hangoverFormatter } from '../../normalizers/adaptFormData';

const HangoverLink = ({ _id, firstName, lastName }) =>
  <Link to={`/hangovers/${_id}`}>{hangoverFormatter({ firstName, lastName })}</Link>;

HangoverLink.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default HangoverLink;
