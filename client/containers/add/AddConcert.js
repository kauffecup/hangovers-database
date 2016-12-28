import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptConcertSubmit } from '../../normalizers/adaptSubmit';
import { addConcert, ADD_CONCERT_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitConcertForm from '../../components/forms/SubmitConcertForm';

const AddConcert = ({ app, dispatch, handleSubmit }) =>
  <Add
    title="Add Concert"
    handleSubmit={handleSubmit(values => dispatch(addConcert(adaptConcertSubmit(values))))}
  >
    <SubmitConcertForm app={app} editName />
  </Add>;

AddConcert.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_CONCERT_FORM,
  destroyOnUnmount: false,
})(AddConcert));
