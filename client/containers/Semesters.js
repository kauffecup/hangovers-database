import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List, AutoSizer } from 'react-virtualized';
import { StyleSheet, css } from 'aphrodite';
import SemesterLink from '../components/links/SemesterLink';
import { PADDING_UNIT, SEMESTER_HEIGHT } from '../StyleConstants';

const Semesters = ({ semesters }) => {
  const rowRenderer = ({ index, key, style }) => // eslint-disable-line
    <div key={key} style={style}>
      <div className={css(styles.semester)}>
        <SemesterLink {...semesters[index]} />
      </div>
    </div>;

  return (
    <div className={css(styles.semesters)}>
      <AutoSizer>
        {({ height, width }) => (height && width) ? (
          <List
            rowRenderer={rowRenderer}
            rowCount={semesters.length}
            width={width}
            height={height}
            rowHeight={SEMESTER_HEIGHT}
          />
        ) : null}
      </AutoSizer>
    </div>
  );
};

const styles = StyleSheet.create({
  semesters: {
    flex: 1,
    padding: `${PADDING_UNIT}px`,
  },
  semester: {
    height: `${SEMESTER_HEIGHT}px`,
  },
});

Semesters.propTypes = {
  semesters: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  semesters: state.app.semesters,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Semesters);
