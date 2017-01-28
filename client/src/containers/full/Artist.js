import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import { getArtist } from '../../actions';
import { artistFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Artist = ({ dispatch, id, artist, loading }) =>
  <Full
    title={artistFormatter(artist)}
    load={() => dispatch(getArtist(id))}
    path={`/edit/artist/${id}`}
    loading={loading}
  >
    <Card title="Arrangements">
      <ArrangementList arrangements={artist.arrangements} />
    </Card>
  </Full>;

Artist.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  artist: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the artist state
const mapStateToProps = (state, routerProps) => ({
  loading: state.artist.loading,
  artist: state.artist.artist,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Artist);
