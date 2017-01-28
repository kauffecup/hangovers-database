import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { adaptArtistSubmit } from '../../normalizers/adaptSubmit';
import { addArtist, ADD_ARTIST_FORM } from '../../actions';
import Add from '../../components/pages/Add';
import SubmitArtistForm from '../../components/forms/SubmitArtistForm';

const AddArtist = ({ dispatch, handleSubmit }) =>
  <Add
    title="Add Artist"
    handleSubmit={handleSubmit(values => dispatch(addArtist(adaptArtistSubmit(values))))}
  >
    <SubmitArtistForm editName />
  </Add>;

AddArtist.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: ADD_ARTIST_FORM,
  destroyOnUnmount: false,
})(AddArtist));
