import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import SemesterLink from '../links/SemesterLink';

const SemesterList = ({ title, semesters = [] }) =>
  <List title={title} items={semesters} Component={SemesterLink} />;

SemesterList.propTypes = {
  title: PropTypes.string,
  semesters: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default SemesterList;
