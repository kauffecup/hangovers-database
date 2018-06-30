import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptSemesterSubmit } from '../../normalizers/adaptSubmit';
import { addSemester, ADD_SEMESTER_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitSemesterForm from '../../components/forms/SubmitSemesterForm';

const AddSemester = ({ app, dispatch, handleSubmit }) =>
  <Add
    title="Add Semester"
    handleSubmit={handleSubmit(values => dispatch(addSemester(adaptSemesterSubmit(values))))}
  >
    <SubmitSemesterForm app={app} editName />
  </Add>;

AddSemester.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_SEMESTER_FORM,
  destroyOnUnmount: false,
})(AddSemester));
