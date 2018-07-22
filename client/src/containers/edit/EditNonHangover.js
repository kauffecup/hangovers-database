import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptNonHangoverSubmit } from '../../normalizers/adaptSubmit';
import { getEditNonHangoverData, destroyNonHangover, editNonHangover, EDIT_NON_HANGOVER_FORM } from '../../actions';
import { nonHangoverFormatter } from '../../normalizers/adaptFormData';
import Edit from '../../components/pages/Edit';
import SubmitNonHangoverForm from '../../components/forms/SubmitNonHangoverForm';

const EditNonHangover = ({ dispatch, handleSubmit, name, rev, loading, match: { params: { id } } }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditNonHangoverData(id))}
    handleSubmit={handleSubmit(values => dispatch(editNonHangover(adaptNonHangoverSubmit(values))))}
    handleDelete={() => dispatch(destroyNonHangover(id, rev))}
    loading={loading}
  >
    <SubmitNonHangoverForm />
  </Edit>;

EditNonHangover.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rev: PropTypes.string,
};

const mapStateToProps = (state) => ({
  app: state.app,
  loading: state.form[EDIT_NON_HANGOVER_FORM] && state.form[EDIT_NON_HANGOVER_FORM].loading,
  name: nonHangoverFormatter(state.form[EDIT_NON_HANGOVER_FORM] && state.form[EDIT_NON_HANGOVER_FORM].values),
  rev: state.form && state.form[EDIT_NON_HANGOVER_FORM] && state.form[EDIT_NON_HANGOVER_FORM].values && state.form[EDIT_NON_HANGOVER_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_NON_HANGOVER_FORM,
  destroyOnUnmount: false,
})(EditNonHangover));
