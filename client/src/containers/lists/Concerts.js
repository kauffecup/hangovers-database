import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ConcertLink from '../../components/links/ConcertLink';
import List from '../../components/pages/List';
import rowWithSemester from '../../components/rowWithSemester';

const Concerts = ({ concerts }) =>
  <List
    list={concerts}
    ChildComponent={rowWithSemester(ConcertLink)}
    addPath="concerts/submit"
    addType="concert"
  />;

Concerts.propTypes = {
  concerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  concerts: state.app.concerts,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Concerts);
