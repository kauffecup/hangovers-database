import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptAlbumSubmit } from '../../normalizers/adaptSubmit';
import { getEditAlbumData, editAlbum, destroyAlbum, EDIT_ALBUM_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import { albumFormatter } from '../../normalizers/adaptFormData';
import SubmitAlbumForm from '../../components/forms/SubmitAlbumForm';

const EditAlbum = ({ app, dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditAlbumData(id))}
    handleSubmit={handleSubmit(values => dispatch(editAlbum(adaptAlbumSubmit(values))))}
    handleDelete={() => dispatch(destroyAlbum(id, rev))}
    loading={loading}
  >
    <SubmitAlbumForm app={app} />
  </Edit>;

EditAlbum.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rev: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  loading: state.form[EDIT_ALBUM_FORM] && state.form[EDIT_ALBUM_FORM].loading,
  id: routerProps.params.id,
  name: albumFormatter(state.form[EDIT_ALBUM_FORM] && state.form[EDIT_ALBUM_FORM].values),
  rev: state.form && state.form[EDIT_ALBUM_FORM] && state.form[EDIT_ALBUM_FORM].values && state.form[EDIT_ALBUM_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_ALBUM_FORM,
  destroyOnUnmount: false,
})(EditAlbum));
