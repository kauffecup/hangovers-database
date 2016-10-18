import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

const Arrangement = ({ arrangementMap, id }) => {
  const a = arrangementMap[id];
  return (
    <div className={css(styles.arrangement)}>
      <h2>{a.name}</h2>
      { a.alternateName ? <h3>{a.alternateName}</h3> : null }
      { a.whenWritten ? <h3>{a.whenWritten}</h3> : null }
      <div>
        <span>orignally performed by</span>
        <span>{ a.originalArtists.map(artist => <span>{artist}</span>) }</span>
      </div>
      <div>
        <span>genre</span>
        <span>{ a.genre }</span>
      </div>
      <div>
        <span>{ a.key }</span>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  arrangement: {
  },
});

Arrangement.propTypes = {
  arrangementMap: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the arrangement state
const mapStateToProps = (state, routerProps) => ({
  arrangementMap: state.arrangements.arrangementMap,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Arrangement);
