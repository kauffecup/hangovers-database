import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptArtistSubmit } from '../../normalizers/adaptSubmit';
import RenderAsync from '../../components/form/RenderAsync';
import { getEditArtistData, destroyArtist, editArtist, ARTIST_FORM } from '../../actions';
import { searchArrangements } from '../../actions/search';
import { artistFormatter } from '../../normalizers/adaptFormData';
import Edit from '../../components/pages/Edit';

const EditArtist = ({ dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditArtistData(id))}
    handleSubmit={handleSubmit(values => dispatch(editArtist(adaptArtistSubmit(values))))}
    handleDelete={() => dispatch(destroyArtist(id, rev))}
    loading={loading}
  >
    <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
  </Edit>;

EditArtist.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  rev: PropTypes.string,
  name: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: artistFormatter(state.form[ARTIST_FORM] && state.form[ARTIST_FORM].values),
  rev: state.form && state.form[ARTIST_FORM] && state.form[ARTIST_FORM].values && state.form[ARTIST_FORM].values._rev,
  loading: state.form[ARTIST_FORM] && state.form[ARTIST_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ARTIST_FORM,
  destroyOnUnmount: false,
})(EditArtist));
