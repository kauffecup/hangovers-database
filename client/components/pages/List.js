import React, { PropTypes } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import { LIST_ITEM_HEIGHT, PADDING_UNIT } from '../../StyleConstants';

const VirtualList = ({ list, ChildComponent }) => {
  const rowRenderer = ({ index, key, style }) => // eslint-disable-line
    <div key={key} style={style}>
      <div className={css(styles.album)}>
        <ChildComponent {...list[index]} />
      </div>
    </div>;

  return (
    <div className={css(styles.list)}>
      <AutoSizer>
        {({ height, width }) => (height && width) ? (
          <List
            rowRenderer={rowRenderer}
            rowCount={list.length}
            width={width}
            height={height}
            rowHeight={LIST_ITEM_HEIGHT}
          />
        ) : null}
      </AutoSizer>
    </div>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  album: {
    height: `${LIST_ITEM_HEIGHT}px`,
  },
});

VirtualList.propTypes = {
  list: PropTypes.array.isRequired,
  ChildComponent: PropTypes.object,
};

export default VirtualList;
