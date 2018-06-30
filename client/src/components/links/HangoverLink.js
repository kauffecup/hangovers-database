import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { hangoverFormatter } from '../../normalizers/adaptFormData';

const HangoverLink = ({ _id, firstName, lastName, hangsName }) =>
  <Link to={`/hangovers/${_id}`}>{hangoverFormatter({ firstName, lastName, hangsName })}</Link>;

HangoverLink.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  hangsName: PropTypes.string,
};

export default HangoverLink;
