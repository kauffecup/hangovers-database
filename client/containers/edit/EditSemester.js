import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptSemesterSubmit } from '../../normalizers/adaptSubmit';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Button from '../../components/Button';
import { getEditSemesterData, editSemester, SEMESTER_FORM } from '../../actions';
import {
  searchArrangements,
  searchHangovers,
} from '../../actions/search';
import {
  albumAdapter,
  concertAdapter,
  semesterFormatter,
} from '../../normalizers/adaptFormData';

class EditSemester extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditSemesterData(id));
  }

  render() {
    const { app, dispatch, handleSubmit, name } = this.props;
    const { semesterMap, concerts: co, albums: al } = app;
    const concerts = co.map(c => concertAdapter(c, semesterMap));
    const albums = al.map(albumAdapter);
    return (
      <form onSubmit={handleSubmit(values => dispatch(editSemester(adaptSemesterSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
        <Field label="BM" name="bm" component={RenderAsync} loadOptions={searchHangovers} multi />
        <Field label="President" name="president" component={RenderAsync} loadOptions={searchHangovers} multi />
        <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Field label="Concerts" name="concerts" component={RenderSelect} options={concerts} multi />
        <Field label="Songs Performed" name="performed" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Field label="Albums" name="albums" component={RenderSelect} options={albums} multi />
        <Field label="Hangovers Graduated" name="graduatingHangs" component={RenderAsync} loadOptions={searchHangovers} multi />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditSemester.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: semesterFormatter(state.form.editSemester && state.form.editSemester.values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: SEMESTER_FORM,
  destroyOnUnmount: false,
})(EditSemester));
