import React, { PropTypes } from 'react';
import SemesterLink from '../links/SemesterLink';

const HangoverList = ({ title, semesters = [] }) => semesters.length ?
  <div>
    <span>{title}</span>
    <span>{semesters.map(s =>
      <SemesterLink key={s._id} {...s} />
    )}</span>
  </div> : null;

HangoverList.propTypes = {
  title: PropTypes.string,
  semesters: PropTypes.array,
};

export default HangoverList;
