import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtistLink from '../../components/links/ArtistLink';
import { getArtists } from '../../actions';
import LoadingList from '../../components/pages/LoadingList';

const Artists = ({ dispatch, loading, list, totalRows }) =>
  <LoadingList
    page={skip => dispatch(getArtists(skip))}
    loading={loading}
    list={list}
    totalRows={totalRows}
    ChildComponent={ArtistLink}
    addPath="/artists/submit"
    addType="artist"
  />;

Artists.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the artist state
const mapStateToProps = state => state.artists;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Artists);
