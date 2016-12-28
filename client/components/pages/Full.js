import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loadable from './Loadable';
import PathButton from '../PathButton';

const Full = ({ title, load, loading, path, children }) =>
  <Loadable loading={loading} load={load}>
    <div className={css(styles.subHeader)}>
      <h2 className={css(styles.headerName)}>{title}</h2>
      <PathButton text="edit" path={path} />
    </div>
    {children}
  </Loadable>;

const styles = StyleSheet.create({
  subHeader: {
    display: 'flex',
  },
  headerName: {
    flex: 1,
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
