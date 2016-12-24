import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AlbumList from '../../components/lists/AlbumList';
import ArrangementList from '../../components/lists/ArrangementList';
import ConcertList from '../../components/lists/ConcertList';
import HangoverList from '../../components/lists/HangoverList';
import { getSemester } from '../../actions';
import { semesterFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';

const Semester = ({ dispatch, id, semester, loading }) =>
  <Full
    title={semesterFormatter(semester)}
    load={() => dispatch(getSemester(id))}
    path={`/edit/semester/${id}`}
    loading={loading}
  >
    <HangoverList title="MD" hangovers={semester.md} />
    <HangoverList title="BM" hangovers={semester.bm} />
    <HangoverList title="President" hangovers={semester.president} />
    <h3>Arrangements</h3>
    <ArrangementList arrangements={semester.arrangements} />
    <h3>Concerts</h3>
    <ConcertList concerts={semester.concerts} />
    <h3>Songs Performed</h3>
    <ArrangementList arrangements={semester.performed} />
    <h3>Albums</h3>
    <AlbumList albums={semester.albums} />
    <h3>Hangovers Graduated</h3>
    <HangoverList hangovers={semester.graduatingHangs} />
  </Full>;

Semester.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  semester: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the semester state
const mapStateToProps = (state, routerProps) => ({
  loading: state.semester.loading,
  semester: state.semester.semester,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Semester);
