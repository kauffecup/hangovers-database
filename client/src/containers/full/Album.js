import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import SemesterList from '../../components/lists/SemesterList';
import { getAlbum } from '../../actions';
import { albumFormatter, albumFormatFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';
import DisplayField from '../../components/DisplayField';

const Album = ({ dispatch, id, album, loading }) =>
  <Full
    title={albumFormatter(album)}
    load={() => dispatch(getAlbum(id))}
    path={`albums/edit/${id}`}
    loading={loading}
  >
    <SemesterList semesters={album.semester} />
    <DisplayField title="Released on" text={(album.format || []).map(albumFormatFormatter).join(', ')} />
    <Card title="Track List">
      <ArrangementList arrangements={album.trackList} />
    </Card>
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
