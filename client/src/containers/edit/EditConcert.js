import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptConcertSubmit } from '../../normalizers/adaptSubmit';
import { getEditConcertData, editConcert, destroyConcert, EDIT_CONCERT_FORM } from '../../actions';
import Edit from '../../components/pages/Edit';
import SubmitConcertForm from '../../components/forms/SubmitConcertForm';
import { concertFormatter } from '../../normalizers/adaptFormData';

const EditConcert = ({ app, dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditConcertData(id))}
    handleSubmit={handleSubmit(values => dispatch(editConcert(adaptConcertSubmit(values))))}
    handleDelete={() => dispatch(destroyConcert(id, rev))}
    loading={loading}
  >
    <SubmitConcertForm app={app} />
  </Edit>;

EditConcert.propTypes = {
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
  loading: state.form[EDIT_CONCERT_FORM] && state.form[EDIT_CONCERT_FORM].loading,
  id: routerProps.params.id,
  name: concertFormatter(state.form[EDIT_CONCERT_FORM] && state.form[EDIT_CONCERT_FORM].values),
  rev: state.form && state.form[EDIT_CONCERT_FORM] && state.form[EDIT_CONCERT_FORM].values && state.form[EDIT_CONCERT_FORM].values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_CONCERT_FORM,
  destroyOnUnmount: false,
})(EditConcert));
