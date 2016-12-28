import React, { PropTypes } from 'react';
import Loadable from './Loadable';
import Button from '../../components/Button';

const Edit = ({ getEditData, title, handleSubmit, handleDelete, children, loading }) =>
  <Loadable load={getEditData} loading={loading}>
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      {children}
      <Button type="submit" text="Submit" />
      {handleDelete ? <Button text="Delete" handleClick={handleDelete} error type="button" /> : null}
    </form>
  </Loadable>;

Edit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  getEditData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.array,
  title: PropTypes.string,
};

export default Edit;
