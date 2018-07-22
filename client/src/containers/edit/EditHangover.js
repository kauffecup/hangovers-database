import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptHangoverSubmit } from '../../normalizers/adaptSubmit';
import { getEditHangoverData, editHangover, destroyHangover, EDIT_HANGOVER_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitHangoverForm from '../../components/forms/SubmitHangoverForm';
import { hangoverFormatter } from '../../normalizers/adaptFormData';

const EditHangover = ({ app, dispatch, handleSubmit, name, rev, loading, match: { params: { id } } }) => (
  <Edit
    title={name}
    getEditData={() => dispatch(getEditHangoverData(id))}
    handleSubmit={handleSubmit(values => dispatch(editHangover(adaptHangoverSubmit(values))))}
    handleDelete={() => dispatch(destroyHangover(id, rev))}
    loading={loading}
  >
    <SubmitHangoverForm app={app} />
  </Edit>
);

EditHangover.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rev: PropTypes.string,
};

const mapStateToProps = (state) => ({
  app: state.app,
  loading: state.form[EDIT_HANGOVER_FORM] && state.form[EDIT_HANGOVER_FORM].loading,
  name: hangoverFormatter(state.form[EDIT_HANGOVER_FORM] && state.form[EDIT_HANGOVER_FORM].values),
  rev: state.form && state.form[EDIT_HANGOVER_FORM] && state.form[EDIT_HANGOVER_FORM].values && state.form[EDIT_HANGOVER_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_HANGOVER_FORM,
  destroyOnUnmount: false,
})(EditHangover));
