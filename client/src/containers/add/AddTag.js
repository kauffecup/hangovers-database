import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptTagSubmit } from '../../normalizers/adaptSubmit';
import { addTag, ADD_TAG_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitTagForm from '../../components/forms/SubmitTagForm';

const AddTag = ({ dispatch, handleSubmit }) =>
  <Add
    title={name}
    handleSubmit={handleSubmit(values => dispatch(addTag(adaptTagSubmit(values))))}
  >
    <SubmitTagForm editName />
  </Add>;

AddTag.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_TAG_FORM,
  destroyOnUnmount: false,
})(AddTag));
