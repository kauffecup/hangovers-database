import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptHangoverSubmit } from '../../normalizers/adaptSubmit';
import { getEditHangoverData, editHangover, EDIT_HANGOVER_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitHangoverForm from '../../components/forms/SubmitHangoverForm';
import { hangoverFormatter } from '../../normalizers/adaptFormData';

const EditHangover = ({ app, dispatch, handleSubmit, name, id, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditHangoverData(id))}
    handleSubmit={handleSubmit(values => dispatch(editHangover(adaptHangoverSubmit(values))))}
    loading={loading}
  >
    <SubmitHangoverForm app={app} />
  </Edit>;

EditHangover.propTypes = {
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
  name: hangoverFormatter(state.form[EDIT_HANGOVER_FORM] && state.form[EDIT_HANGOVER_FORM].values),
  loading: state.form[EDIT_HANGOVER_FORM] && state.form[EDIT_HANGOVER_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_HANGOVER_FORM,
  destroyOnUnmount: false,
})(EditHangover));
