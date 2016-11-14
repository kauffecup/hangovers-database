import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { semesterFormatter } from '../../normalizers/adaptFormData';

const semesterLink = ({ _id, year, semester_type }) =>
  <Link to={`/semesters/${_id}`}>{semesterFormatter({ year, semester_type })}</Link>;

semesterLink.propTypes = {
  _id: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  semester_type: PropTypes.string.isRequired,
};

export default semesterLink;
