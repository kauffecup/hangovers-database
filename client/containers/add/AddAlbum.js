import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptAlbumSubmit } from '../../normalizers/adaptSubmit';
import { addAlbum, ADD_ALBUM_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitAlbumForm from '../../components/forms/SubmitAlbumForm';

const AddAlbum = ({ app, dispatch, handleSubmit }) =>
  <Add
    title="Add Album"
    handleSubmit={handleSubmit(values => dispatch(addAlbum(adaptAlbumSubmit(values))))}
  >
    <SubmitAlbumForm app={app} editName />
  </Add>;

AddAlbum.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_ALBUM_FORM,
  destroyOnUnmount: false,
})(AddAlbum));
