import React, { PropTypes } from 'react';
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
