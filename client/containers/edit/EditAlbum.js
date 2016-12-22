import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptAlbumSubmit } from '../../normalizers/adaptSubmit';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Button from '../../components/Button';
import { getEditAlbumData, editAlbum } from '../../actions';
import { searchArrangements } from '../../actions/search';
import {
  albumFormatAdapter,
  concertFormatter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

class EditAlbum extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditAlbumData(id));
  }

  render() {
    const { app, dispatch, handleSubmit, name } = this.props;
    const { albumFormats: af, semesters: s } = app;
    const albumFormats = af.map(albumFormatAdapter);
    const semesters = s.map(semesterAdapter);
    return (
      <form onSubmit={handleSubmit(values => dispatch(editAlbum(adaptAlbumSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="Format" name="format" component={RenderSelect} options={albumFormats} />
        <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
        <Field label="Track List" name="trackList" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditAlbum.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: concertFormatter(state.form.editAlbum && state.form.editAlbum.values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'editAlbum',
  destroyOnUnmount: false,
})(EditAlbum));
