import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SemesterLink from '../../components/links/SemesterLink';
import List from '../../components/pages/List';

const Semesters = ({ semesters }) =>
  <List
    list={semesters}
    ChildComponent={SemesterLink}
    addPath="semesters/submit"
    addType="semester"
  />;

Semesters.propTypes = {
  semesters: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  semesters: state.app.semesters,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Semesters);
