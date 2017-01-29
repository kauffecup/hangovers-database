import React, { PropTypes } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import PathButton from '../PathButton';
import { LIST_ITEM_HEIGHT, PADDING_UNIT } from '../../StyleConstants';
import rowRender from '../rowRender';

const VirtualList = ({ list, ChildComponent, addPath, addType }) => {
  const rowRenderer = rowRender(list, ChildComponent);
  return (
    <div className={css(styles.list)}>
      <AutoSizer>
        {({ height, width }) => (height && width) ? (
          <List
            rowRenderer={rowRenderer}
            rowCount={list.length}
            width={width}
            height={height}
            rowHeight={LIST_ITEM_HEIGHT + PADDING_UNIT}
          />
        ) : null}
      </AutoSizer>
      {addPath ? <PathButton text={`add ${addType}`} path={addPath} styles={styles.addButton} /> : null}
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
  addButton: {
    position: 'fixed',
    top: '21px',
    right: `${PADDING_UNIT}px`,
  },
});

VirtualList.propTypes = {
  list: PropTypes.array.isRequired,
  addPath: PropTypes.string,
  addType: PropTypes.string,
  ChildComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

export default VirtualList;
