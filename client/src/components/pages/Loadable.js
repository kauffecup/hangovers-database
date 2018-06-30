import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import ProgressBar from 'react-progress';
import { PADDING_UNIT } from '../../StyleConstants';

class Loadable extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { loading, children } = this.props;
    return (
      <div className={css(styles.full)}>
        <ProgressBar
          percent={loading ? 20 : 100}
          style={{ position: 'absolute' }}
        />
        { loading ? null : <div>{children}</div> }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
    position: 'relative',
    '-webkit-overflow-scrolling': 'touch',
  },
});

Loadable.propTypes = {
  load: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default Loadable;
