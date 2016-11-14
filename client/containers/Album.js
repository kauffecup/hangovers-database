import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ArrangementLink from '../components/links/ArrangementLink';
import SemesterLink from '../components/links/SemesterLink';
import { getAlbum } from '../actions';
import { albumFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

class Album extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getAlbum(id));
  }

  render() {
    const { album, loading } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <h2>{albumFormatter(album)}</h2>
        {album.semester && album.semester.length ?
          <SemesterLink {...album.semester[0]} />
        : null}
        <h3>Set List</h3>
        {album.trackList && album.trackList.length ? album.trackList.map(a =>
          <ArrangementLink key={a._id} {...a} />
        ) : '...nothin'}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  arrangement: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
  },
});

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
