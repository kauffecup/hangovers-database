import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import AlbumLink from '../../components/links/AlbumLink';
import { PADDING_UNIT, ALBUM_HEIGHT } from '../../StyleConstants';

const Albums = ({ albums }) => {
  const rowRenderer = ({ index, key, style }) => // eslint-disable-line
    <div key={key} style={style}>
      <div className={css(styles.album)}>
        <AlbumLink {...albums[index]} />
      </div>
    </div>;

  return (
    <div className={css(styles.albums)}>
      <AutoSizer>
        {({ height, width }) => (height && width) ? (
          <List
            rowRenderer={rowRenderer}
            rowCount={albums.length}
            width={width}
            height={height}
            rowHeight={ALBUM_HEIGHT}
          />
        ) : null}
      </AutoSizer>
    </div>
  );
};

const styles = StyleSheet.create({
  albums: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  album: {
    height: `${ALBUM_HEIGHT}px`,
  },
});

Albums.propTypes = {
  albums: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  albums: state.app.albums,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Albums);
