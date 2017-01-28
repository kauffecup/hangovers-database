import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import ConcertList from '../../components/lists/ConcertList';
import SemesterList from '../../components/lists/SemesterList';
import { getHangover } from '../../actions';
import { hangoverFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Hangover = ({ dispatch, id, hangover, loading }) =>
  <Full
    title={hangoverFormatter(hangover)}
    load={() => dispatch(getHangover(id))}
    path={`/edit/hangover/${id}`}
    loading={loading}
  >
    <SemesterList title="Graduated" semesters={hangover.graduationSemester} />
    <SemesterList title="MDed" semesters={hangover.semestersMDed} />
    <SemesterList title="BMed" semesters={hangover.semestersBMed} />
    <SemesterList title="Presided" semesters={hangover.semestersPresided} />
    <ConcertList title="MDed" concerts={hangover.concertsMDed} />
    <Card title="Arranged">
      <ArrangementList arrangements={hangover.arranged} />
    </Card>
    <Card title="Soloed">
      <ArrangementList arrangements={hangover.soloed} />
    </Card>
  </Full>;

Hangover.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hangover: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the hangover state
const mapStateToProps = (state, routerProps) => ({
  loading: state.hangover.loading,
  hangover: state.hangover.hangover,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Hangover);
