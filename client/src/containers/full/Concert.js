import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import SemesterList from '../../components/lists/SemesterList';
import HangoverList from '../../components/lists/HangoverList';
import { getConcert } from '../../actions';
import { concertFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Concert = ({ dispatch, concert, loading, match: { params: { id } } }) =>
  <Full
    title={concertFormatter(concert)}
    load={() => dispatch(getConcert(id))}
    path={`/concerts/edit/${id}`}
    loading={loading}
  >
    <SemesterList semesters={concert.semester} />
    <HangoverList title="MD" hangovers={concert.md} />
    <Card title="Set List">
      <ArrangementList arrangements={concert.setList} />
    </Card>
  </Full>;

Concert.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  concert: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the concert state
const mapStateToProps = (state) => ({
  loading: state.concert.loading,
  concert: state.concert.concert,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Concert);
