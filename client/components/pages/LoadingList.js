import React, { Component, PropTypes } from 'react';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import { LIST_ITEM_HEIGHT, PADDING_UNIT } from '../../StyleConstants';

class LoadingList extends Component {
  componentDidMount() {
    const { page } = this.props;
    page();
  }

  render() {
    const { loading, list, totalRows, page, ChildComponent } = this.props;
    const hasNextPage = list.length < totalRows;
    const loadNextPage = () => page(list.length);

    // Only load 1 "page" of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = loading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

    // Render a history item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => // eslint-disable-line
      <div key={key} style={style}>
        <div className={css(styles.childComponent)}>
          <ChildComponent {...list[index]} />
        </div>
      </div>;

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
                  rowHeight={LIST_ITEM_HEIGHT}
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
  list: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  childComponent: {
    height: `${LIST_ITEM_HEIGHT}px`,
  },
});

LoadingList.propTypes = {
  page: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
  ChildComponent: React.PropTypes.object,
};

// Wrap the component to inject dispatch and state into it
export default LoadingList;
