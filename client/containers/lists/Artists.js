import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import ArtistLink from '../../components/links/ArtistLink';
import { getArtists } from '../../actions';
import { ARTIST_HEIGHT, PADDING_UNIT } from '../../StyleConstants';

class Hangovers extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getArtists());
  }

  render() {
    const { loading, list, totalRows, dispatch } = this.props;
    const hasNextPage = list.length < totalRows;
    const loadNextPage = () => dispatch(getArtists(list.length));

    // Only load 1 "page" of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = loading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

    // Render a history item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => // eslint-disable-line
      <div key={key} style={style}>
        <div className={css(styles.artist)}>
          <ArtistLink {...list[index]} />
        </div>
      </div>;

    return (
      <div className={css(styles.artists)}>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={totalRows}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (height && width) ? (
                <List
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                  rowCount={list.length}
                  width={width}
                  height={height}
                  rowHeight={ARTIST_HEIGHT}
                />
              ) : null}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  artists: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  artist: {
    height: `${ARTIST_HEIGHT}px`,
  },
});

Hangovers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the artist state
const mapStateToProps = state => state.artists;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Hangovers);
