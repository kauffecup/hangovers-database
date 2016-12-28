import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptSemesterSubmit } from '../../normalizers/adaptSubmit';
import { getEditSemesterData, editSemester, EDIT_SEMESTER_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitSemesterForm from '../../components/forms/SubmitSemesterForm';
import { semesterFormatter } from '../../normalizers/adaptFormData';

const EditSemester = ({ app, dispatch, handleSubmit, name, id, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditSemesterData(id))}
    handleSubmit={handleSubmit(values => dispatch(editSemester(adaptSemesterSubmit(values))))}
    loading={loading}
  >
    <SubmitSemesterForm app={app} />
  </Edit>;

EditSemester.propTypes = {
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
  name: semesterFormatter(state.form[EDIT_SEMESTER_FORM] && state.form[EDIT_SEMESTER_FORM].values),
  loading: state.form[EDIT_SEMESTER_FORM] && state.form[EDIT_SEMESTER_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_SEMESTER_FORM,
  destroyOnUnmount: false,
})(EditSemester));
