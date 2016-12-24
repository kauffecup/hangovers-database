import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import SemesterList from '../../components/lists/SemesterList';
import { getAlbum } from '../../actions';
import { albumFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';

const Album = ({ dispatch, id, album, loading }) =>
  <Full
    title={albumFormatter(album)}
    load={() => dispatch(getAlbum(id))}
    path={`/edit/album/${id}`}
    loading={loading}
  >
    <SemesterList semesters={album.semester} />
    <h3>Track List</h3>
    <ArrangementList arrangements={album.trackList} />
  </Full>;

Album.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  album: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the album state
const mapStateToProps = (state, routerProps) => ({
  loading: state.album.loading,
  album: state.album.album,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Album);
