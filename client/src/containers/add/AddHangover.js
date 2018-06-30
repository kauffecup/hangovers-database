import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptHangoverSubmit } from '../../normalizers/adaptSubmit';
import { addHangover, ADD_HANGOVER_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitHangoverForm from '../../components/forms/SubmitHangoverForm';

const AddHangover = ({ app, dispatch, handleSubmit }) =>
  <Add
    title="Add Hangover"
    handleSubmit={handleSubmit(values => dispatch(addHangover(adaptHangoverSubmit(values))))}
  >
    <SubmitHangoverForm app={app} editName />
  </Add>;

AddHangover.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_HANGOVER_FORM,
  destroyOnUnmount: false,
})(AddHangover));
