import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { addArrangement, ARRANGEMENT_FORM } from '../actions';
import validate, { asyncValidate } from '../normalizers/validate';
import SubmitArrangementForm from '../components/SubmitArrangementForm';

const AddArrangement = props =>
  <SubmitArrangementForm {...props} submit={values => props.dispatch(addArrangement(values))} />;

AddArrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// for now, we want it all!
// we want the app state
const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ARRANGEMENT_FORM,
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncBlurFields: ['name'],
})(AddArrangement));
