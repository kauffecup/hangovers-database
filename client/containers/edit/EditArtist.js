import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptArtistSubmit } from '../../normalizers/adaptSubmit';
import RenderAsync from '../../components/form/RenderAsync';
import Button from '../../components/Button';
import { getEditArtistData, editArtist } from '../../actions';
import { searchArrangements } from '../../actions/search';
import { artistFormatter } from '../../normalizers/adaptFormData';

class EditArtist extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditArtistData(id));
  }

  render() {
    const { dispatch, handleSubmit, name } = this.props;
    return (
      <form onSubmit={handleSubmit(values => dispatch(editArtist(adaptArtistSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditArtist.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: artistFormatter(state.form.editArtist && state.form.editArtist.values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'editArtist',
  destroyOnUnmount: false,
})(EditArtist));
