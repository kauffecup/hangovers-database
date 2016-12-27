import React, { Component, PropTypes } from 'react';
import Button from '../../components/Button';

class Edit extends Component {
  componentDidMount() {
    const { getEditData } = this.props;
    getEditData();
  }

  render() {
    const { title, handleSubmit, handleDelete, children } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {children}
        <Button type="submit" text="Submit" />
        {handleDelete ? <Button text="Delete" handleClick={handleDelete} error type="button" /> : null}
      </form>
    );
  }
}

Edit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  getEditData: PropTypes.func.isRequired,
  children: PropTypes.array,
  title: PropTypes.string,
};

export default Edit;
