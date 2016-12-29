import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addArrangement, deleteAttachment, ADD_ARRANGEMENT_FORM } from '../../actions';
import validate, { asyncValidate } from '../../normalizers/validate';
import { adaptArrangementSubmit } from '../../normalizers/adaptSubmit';
import Add from '../../components/pages/Add';
import SubmitArrangementForm from '../../components/forms/SubmitArrangementForm';

const AddArrangement = ({ app, handleSubmit, dispatch }) =>
  <Add
    title="Add Arrangement"
    handleSubmit={handleSubmit(values => dispatch(addArrangement(adaptArrangementSubmit(values))))}
  >
    <SubmitArrangementForm
      app={app}
      editName
      handleFileRemove={(fileField, fileName) => dispatch(deleteAttachment(ADD_ARRANGEMENT_FORM, fileField, fileName))}
    />;
  </Add>;

AddArrangement.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// for now, we want the app state
const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_ARRANGEMENT_FORM,
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncBlurFields: ['name'],
})(AddArrangement));
