import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptAlbumSubmit } from '../../normalizers/adaptSubmit';
import { getEditAlbumData, editAlbum, EDIT_ALBUM_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import { albumFormatter } from '../../normalizers/adaptFormData';
import SubmitAlbumForm from '../../components/forms/SubmitAlbumForm';

const EditAlbum = ({ app, dispatch, handleSubmit, name, id, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditAlbumData(id))}
    handleSubmit={handleSubmit(values => dispatch(editAlbum(adaptAlbumSubmit(values))))}
    loading={loading}
  >
    <SubmitAlbumForm app={app} />
  </Edit>;

EditAlbum.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: albumFormatter(state.form[EDIT_ALBUM_FORM] && state.form[EDIT_ALBUM_FORM].values),
  loading: state.form[EDIT_ALBUM_FORM] && state.form[EDIT_ALBUM_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_ALBUM_FORM,
  destroyOnUnmount: false,
})(EditAlbum));
