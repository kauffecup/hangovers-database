import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AlbumList from '../../components/lists/AlbumList';
import ArrangementList from '../../components/lists/ArrangementList';
import ConcertList from '../../components/lists/ConcertList';
import HangoverList from '../../components/lists/HangoverList';
import { getSemester } from '../../actions';
import { semesterFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Semester = ({ dispatch, id, semester, loading }) =>
  <Full
    title={semesterFormatter(semester)}
    load={() => dispatch(getSemester(id))}
    path={`/semesters/edit/${id}`}
    loading={loading}
  >
    <HangoverList title="MD" hangovers={semester.md} />
    <HangoverList title="BM" hangovers={semester.bm} />
    <HangoverList title="President" hangovers={semester.president} />
    <Card title="Arrangements">
      <ArrangementList arrangements={semester.arrangements} />
    </Card>
    <Card title="Concerts">
      <ConcertList concerts={semester.concerts} />
    </Card>
    <Card title="Songs Performed">
      <ArrangementList arrangements={semester.performed} />
    </Card>
    <Card title="Albums">
      <AlbumList albums={semester.albums} />
    </Card>
    <Card title="Hangovers Graduated">
      <HangoverList hangovers={semester.graduatingHangs} />
    </Card>
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
