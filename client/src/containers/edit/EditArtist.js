import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptArtistSubmit } from '../../normalizers/adaptSubmit';
import { getEditArtistData, destroyArtist, editArtist, EDIT_ARTIST_FORM } from '../../actions';
import { artistFormatter } from '../../normalizers/adaptFormData';
import Edit from '../../components/pages/Edit';
import SubmitArtistForm from '../../components/forms/SubmitArtistForm';

const EditArtist = ({ dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditArtistData(id))}
    handleSubmit={handleSubmit(values => dispatch(editArtist(adaptArtistSubmit(values))))}
    handleDelete={() => dispatch(destroyArtist(id, rev))}
    loading={loading}
  >
    <SubmitArtistForm />
  </Edit>;

EditArtist.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rev: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  id: routerProps.params.id,
  name: artistFormatter(state.form[EDIT_ARTIST_FORM] && state.form[EDIT_ARTIST_FORM].values),
  rev: state.form && state.form[EDIT_ARTIST_FORM] && state.form[EDIT_ARTIST_FORM].values && state.form[EDIT_ARTIST_FORM].values._rev,
  loading: state.form[EDIT_ARTIST_FORM] && state.form[EDIT_ARTIST_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_ARTIST_FORM,
  destroyOnUnmount: false,
})(EditArtist));
