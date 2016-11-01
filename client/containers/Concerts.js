import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import { PADDING_UNIT, CONCERT_HEIGHT } from '../StyleConstants';

const Concerts = ({ concerts, semesterMap }) => {
  const rowRenderer = ({ index, key, style }) => // eslint-disable-line
    <div key={key} style={style}>
      <div className={css(styles.concert)}>
        <Link to={`/concert/${concerts[index]._id}`}>{`${concerts[index].name} ${semesterMap[concerts[index].semester].year}`}</Link>
      </div>
    </div>;

  return (
    <div className={css(styles.concerts)}>
      <AutoSizer>
        {({ height, width }) => (height && width) ? (
          <List
            rowRenderer={rowRenderer}
            rowCount={concerts.length}
            width={width}
            height={height}
            rowHeight={CONCERT_HEIGHT}
          />
        ) : null}
      </AutoSizer>
    </div>
  );
};

const styles = StyleSheet.create({
  concerts: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  concert: {
    height: `${CONCERT_HEIGHT}px`,
  },
});

Concerts.propTypes = {
  concerts: PropTypes.array.isRequired,
  semesterMap: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  concerts: state.app.concerts,
  semesterMap: state.app.semesterMap,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Concerts);
