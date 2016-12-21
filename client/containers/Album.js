import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ArrangementList from '../components/lists/ArrangementList';
import SemesterList from '../components/lists/SemesterList';
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
        <SemesterList semesters={album.semester} />
        <h3>Track List</h3>
        <ArrangementList arrangements={album.trackList} />
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
