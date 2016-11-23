import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ArrangementList from '../components/lists/ArrangementList';
import { getArtist } from '../actions';
import { artistFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

class Artist extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getArtist(id));
  }

  render() {
    const { artist, loading } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <h2>{artistFormatter(artist)}</h2>
        <h3>Arrangements</h3>
        <ArrangementList arrangements={artist.arrangements} />
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
