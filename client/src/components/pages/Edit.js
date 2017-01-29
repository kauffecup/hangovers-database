import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Loadable from './Loadable';
import Button from '../../components/Button';

const Edit = ({ getEditData, title, handleSubmit, handleDelete, children, loading }) =>
  <Loadable load={getEditData} loading={loading}>
    <form onSubmit={handleSubmit}>
      <div className={css(styles.subHeader)}>
        <h2 className={css(styles.headerName)}>{title}</h2>
        {handleDelete ? <Button text="Delete" handleClick={handleDelete} error type="button" /> : null}
      </div>
      {children}
      <Button type="submit" text="Submit" />
    </form>
  </Loadable>;

const styles = StyleSheet.create({
  subHeader: {
    display: 'flex',
  },
  headerName: {
    flex: 1,
  },
});

Edit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  getEditData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Edit;
