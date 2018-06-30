import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptSemesterSubmit } from '../../normalizers/adaptSubmit';
import { getEditSemesterData, editSemester, destroySemester, EDIT_SEMESTER_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitSemesterForm from '../../components/forms/SubmitSemesterForm';
import { semesterFormatter } from '../../normalizers/adaptFormData';

const EditSemester = ({ app, dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditSemesterData(id))}
    handleSubmit={handleSubmit(values => dispatch(editSemester(adaptSemesterSubmit(values))))}
    handleDelete={() => dispatch(destroySemester(id, rev))}
    loading={loading}
  >
    <SubmitSemesterForm app={app} />
  </Edit>;

EditSemester.propTypes = {
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
  loading: state.form[EDIT_SEMESTER_FORM] && state.form[EDIT_SEMESTER_FORM].loading,
  id: routerProps.params.id,
  name: semesterFormatter(state.form[EDIT_SEMESTER_FORM] && state.form[EDIT_SEMESTER_FORM].values),
  rev: state.form && state.form[EDIT_SEMESTER_FORM] && state.form[EDIT_SEMESTER_FORM].values && state.form[EDIT_SEMESTER_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_SEMESTER_FORM,
  destroyOnUnmount: false,
})(EditSemester));
