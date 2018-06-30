import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import PathButton from '../PathButton';
import { LIST_ITEM_HEIGHT, PADDING_UNIT } from '../../StyleConstants';
import rowRender from '../rowRender';

class LoadingList extends Component {
  componentDidMount() {
    const { page } = this.props;
    page();
  }

  render() {
    const { loading, list, totalRows, page, ChildComponent, addPath, addType } = this.props;
    const hasNextPage = list.length < totalRows;
    const loadNextPage = () => page(list.length);
    const rowRenderer = rowRender(list, ChildComponent);

    // Only load 1 "page" of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = loading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

    return (
      <div className={css(styles.list)}>
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
                  rowHeight={LIST_ITEM_HEIGHT + PADDING_UNIT}
                />
              ) : null}
            </AutoSizer>
          )}
        </InfiniteLoader>
        {addPath ? <PathButton text={`add ${addType}`} path={addPath} styles={styles.addButton} /> : null}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  addButton: {
    position: 'fixed',
    top: '21px',
    right: `${PADDING_UNIT}px`,
  },
});

LoadingList.propTypes = {
  page: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  addPath: PropTypes.string,
  addType: PropTypes.string,
  ChildComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

// Wrap the component to inject dispatch and state into it
export default LoadingList;
