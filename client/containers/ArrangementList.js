import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import { getArrangements } from '../actions';

const ArrangementList = ({ loading, arrangementList, currentOffset, totalRows, dispatch }) => {
  const hasNextPage = currentOffset + arrangementList.length < totalRows;
  const loadNextPage = () => dispatch(getArrangements(arrangementList.length));

  // Only load 1 "page" of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = loading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < arrangementList.length;

  // Render a history item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => // eslint-disable-line
    <div key={key} style={style}>
      <li>{arrangementList[index].name}</li>
    </div>;

  return (
    <li className={css(styles.arrangementList)}>
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
                rowCount={arrangementList.length}
                width={width}
                height={height}
                rowHeight={200}
              />
            ) : null}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </li>
  );
};

const styles = StyleSheet.create({
  arrangementList: {
  },
});

ArrangementList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  arrangementList: PropTypes.array.isRequired,
  currentOffset: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we don't need any state
const mapStateToProps = state => state.arrangements;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(ArrangementList);
