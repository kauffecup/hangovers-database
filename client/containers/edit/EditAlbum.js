import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptAlbumSubmit } from '../../normalizers/adaptSubmit';
import { getEditAlbumData, editAlbum, ALBUM_FORM } from '../../actions';
import { searchArrangements } from '../../actions/search';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Edit from '../../components/pages/Edit';
import {
  albumFormatAdapter,
  albumFormatter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

const EditAlbum = ({ app, dispatch, handleSubmit, name, id, loading }) => {
  const { albumFormats: af, semesters: s } = app;
  const albumFormats = af.map(albumFormatAdapter);
  const semesters = s.map(semesterAdapter);
  return (
    <Edit
      title={name}
      getEditData={() => dispatch(getEditAlbumData(id))}
      handleSubmit={handleSubmit(values => dispatch(editAlbum(adaptAlbumSubmit(values))))}
      loading={loading}
    >
      <Field label="Format" name="format" component={RenderSelect} options={albumFormats} />
      <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
      <Field label="Track List" name="trackList" component={RenderAsync} loadOptions={searchArrangements} multi />
    </Edit>
  );
};

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
  name: albumFormatter(state.form[ALBUM_FORM] && state.form[ALBUM_FORM].values),
  loading: state.form[ALBUM_FORM] && state.form[ALBUM_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ALBUM_FORM,
  destroyOnUnmount: false,
})(EditAlbum));
