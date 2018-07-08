import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addArrangement, ADD_ARRANGEMENT_FORM } from '../../actions';
import validate, { asyncValidate } from '../../normalizers/validate';
import { adaptArrangementSubmit } from '../../normalizers/adaptSubmit';
import Add from '../../components/pages/Add';
import SubmitArrangementForm from '../../components/forms/SubmitArrangementForm';

const AddArrangement = ({ app, handleSubmit, dispatch, arrangerNotAHangover }) =>
  <Add
    title="Add Arrangement"
    handleSubmit={handleSubmit(values => dispatch(addArrangement(adaptArrangementSubmit(values))))}
  >
    <SubmitArrangementForm
      app={app}
      editName
      arrangerNotAHangover={arrangerNotAHangover}
    />
  </Add>;

AddArrangement.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// for now, we want the app state
const mapStateToProps = state => ({
  app: state.app,
  arrangerNotAHangover: state.form[ADD_ARRANGEMENT_FORM] && state.form[ADD_ARRANGEMENT_FORM].values && state.form[ADD_ARRANGEMENT_FORM].values.arrangerNotAHangover,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_ARRANGEMENT_FORM,
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncBlurFields: ['name'],
})(AddArrangement));
