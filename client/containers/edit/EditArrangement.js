import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditArrangementData, editArrangement, destroyArrangement, EDIT_ARRANGEMENT_FORM } from '../../actions';
import validate from '../../normalizers/validate';
import { adaptArrangementSubmit } from '../../normalizers/adaptSubmit';
import { arrangementFormatter } from '../../normalizers/adaptFormData';
import SubmitArrangementForm from '../../components/forms/SubmitArrangementForm';
import Edit from '../../components/pages/Edit';

const EditArrangement = ({ app, dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditArrangementData(id))}
    handleSubmit={handleSubmit(values => dispatch(editArrangement(adaptArrangementSubmit(values))))}
    handleDelete={() => dispatch(destroyArrangement(id, rev))}
    loading={loading}
  >
    <SubmitArrangementForm app={app} />
  </Edit>;

EditArrangement.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rev: PropTypes.string,
  loading: PropTypes.bool,
};

// we want the app state
const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: arrangementFormatter(state.form[EDIT_ARRANGEMENT_FORM] && state.form[EDIT_ARRANGEMENT_FORM].values),
  rev: state.form && state.form[EDIT_ARRANGEMENT_FORM] && state.form[EDIT_ARRANGEMENT_FORM].values && state.form[EDIT_ARRANGEMENT_FORM].values._rev,
  loading: state.form[EDIT_ARRANGEMENT_FORM] && state.form[EDIT_ARRANGEMENT_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_ARRANGEMENT_FORM,
  destroyOnUnmount: false,
  validate,
})(EditArrangement));
