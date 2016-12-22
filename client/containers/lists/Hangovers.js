import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import HangoverLink from '../../components/links/HangoverLink';
import { getHangovers } from '../../actions';
import { HANGOVER_HEIGHT, PADDING_UNIT } from '../../StyleConstants';

class Hangovers extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getHangovers());
  }

  render() {
    const { loading, list, totalRows, dispatch } = this.props;
    const hasNextPage = list.length < totalRows;
    const loadNextPage = () => dispatch(getHangovers(list.length));

    // Only load 1 "page" of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = loading ? () => {} : loadNextPage;

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < list.length;

    // Render a history item or a loading indicator.
    const rowRenderer = ({ index, key, style }) => // eslint-disable-line
      <div key={key} style={style}>
        <div className={css(styles.arrangement)}>
          <HangoverLink {...list[index]} />
        </div>
      </div>;

    return (
      <div className={css(styles.hangoverList)}>
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
                  rowHeight={HANGOVER_HEIGHT}
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
  hangoverList: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  arrangement: {
    height: `${HANGOVER_HEIGHT}px`,
  },
});

Hangovers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  totalRows: PropTypes.number.isRequired,
};

// for now, we want the arrangement state
const mapStateToProps = state => state.hangovers;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Hangovers);
