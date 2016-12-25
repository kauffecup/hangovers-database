/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { semesterFormatter } from '../normalizers/adaptFormData';

const rowWithSemester = LinkType => props =>
  <div className={css(styles.row)}>
    <LinkType {...props} />
    <span className={css(styles.semester)}>{semesterFormatter(props.semester)}</span>
  </div>;

const styles = StyleSheet.create({
  row: {
    display: 'flex',
  },
  semester: {
    flex: 1,
    'text-align': 'right',
  },
});

export default rowWithSemester;
