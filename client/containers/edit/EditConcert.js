import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptConcertSubmit } from '../../normalizers/adaptSubmit';
import { getEditConcertData, editConcert, EDIT_CONCERT_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitConcertForm from '../../components/forms/SubmitConcertForm';
import { concertFormatter } from '../../normalizers/adaptFormData';

const EditConcert = ({ app, dispatch, handleSubmit, name, id, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditConcertData(id))}
    handleSubmit={handleSubmit(values => dispatch(editConcert(adaptConcertSubmit(values))))}
    loading={loading}
  >
    <SubmitConcertForm app={app} />
  </Edit>;

EditConcert.propTypes = {
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
  name: concertFormatter(state.form[EDIT_CONCERT_FORM] && state.form[EDIT_CONCERT_FORM].values),
  loading: state.form[EDIT_CONCERT_FORM] && state.form[EDIT_CONCERT_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_CONCERT_FORM,
  destroyOnUnmount: false,
})(EditConcert));
