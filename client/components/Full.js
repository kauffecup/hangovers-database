import React, { PropTypes, Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PathButton from './PathButton';
import { PADDING_UNIT } from '../StyleConstants';

class Full extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { title, loading, path, children } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.full)}>
        <PathButton text="edit" path={path} />
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
  },
});

Full.propTypes = {
  load: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.array,
};

export default Full;
