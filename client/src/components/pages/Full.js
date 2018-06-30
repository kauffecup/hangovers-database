import React from 'react';
import PropTypes from 'prop-types';
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
  title: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node,
};

export default Full;
