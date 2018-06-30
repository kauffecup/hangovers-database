import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptTagSubmit } from '../../normalizers/adaptSubmit';
import { getEditTagData, destroyTag, editTag, EDIT_TAG_FORM } from '../../actions';
import { tagFormatter } from '../../normalizers/adaptFormData';
import Edit from '../../components/pages/Edit';
import SubmitTagForm from '../../components/forms/SubmitTagForm';

const EditTag = ({ dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditTagData(id))}
    handleSubmit={handleSubmit(values => dispatch(editTag(adaptTagSubmit(values))))}
    handleDelete={() => dispatch(destroyTag(id, rev))}
    loading={loading}
  >
    <SubmitTagForm />
  </Edit>;

EditTag.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  rev: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  loading: state.form[EDIT_TAG_FORM] && state.form[EDIT_TAG_FORM].loading,
  name: tagFormatter(state.form[EDIT_TAG_FORM] && state.form[EDIT_TAG_FORM].values),
  rev: state.form && state.form[EDIT_TAG_FORM] && state.form[EDIT_TAG_FORM].values && state.form[EDIT_TAG_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_TAG_FORM,
  destroyOnUnmount: false,
})(EditTag));
