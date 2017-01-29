import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { nonHangoverFormatter } from '../../normalizers/adaptFormData';

const NonhangoverLink = ({ _id, name }) =>
  <Link to={`/nonhangovers/${_id}`}>{nonHangoverFormatter({ name })}</Link>;

NonhangoverLink.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  hangsName: PropTypes.string,
};

export default NonhangoverLink;
