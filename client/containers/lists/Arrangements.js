import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementLink from '../../components/links/ArrangementLink';
import { getArrangements } from '../../actions';
import LoadingList from '../../components/pages/LoadingList';

const Arrangements = ({ dispatch, loading, list, totalRows }) =>
  <LoadingList
    page={skip => dispatch(getArrangements(skip))}
    loading={loading}
    list={list}
    totalRows={totalRows}
    ChildComponent={ArrangementLink}
    addPath="submit/arrangement"
    addType="arrangement"
  />;

Arrangements.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the arrangement state
const mapStateToProps = state => state.arrangements;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Arrangements);
