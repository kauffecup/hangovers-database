import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TagLink from '../../components/links/TagLink';
import { getTags } from '../../actions';
import LoadingList from '../../components/pages/LoadingList';

const Tags = ({ dispatch, loading, list, totalRows }) =>
  <LoadingList
    page={skip => dispatch(getTags(skip))}
    loading={loading}
    list={list}
    totalRows={totalRows}
    ChildComponent={TagLink}
    addPath="submit/tag"
    addType="tag"
  />;

Tags.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the artist state
const mapStateToProps = state => state.tags;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Tags);
