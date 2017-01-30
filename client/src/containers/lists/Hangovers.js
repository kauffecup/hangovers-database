import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HangoverLink from '../../components/links/HangoverLink';
import { getHangovers } from '../../actions';
import LoadingList from '../../components/pages/LoadingList';

const Hangovers = ({ dispatch, loading, list, totalRows }) =>
  <LoadingList
    page={skip => dispatch(getHangovers(skip))}
    loading={loading}
    list={list}
    totalRows={totalRows}
    ChildComponent={HangoverLink}
    addPath="hangovers/submit"
    addType="hangover"
  />;

Hangovers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the arrangement state
const mapStateToProps = state => state.hangovers;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Hangovers);
