import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptSemesterSubmit } from '../../normalizers/adaptSubmit';
import { getEditSemesterData, editSemester, SEMESTER_FORM } from '../../actions';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Edit from '../../components/pages/Edit';
import {
  searchArrangements,
  searchHangovers,
} from '../../actions/search';
import {
  albumAdapter,
  concertAdapter,
  semesterFormatter,
} from '../../normalizers/adaptFormData';

const EditSemester = ({ app, dispatch, handleSubmit, name, id, loading }) => {
  const { concerts: co, albums: al } = app;
  const concerts = co.map(c => concertAdapter(c));
  const albums = al.map(albumAdapter);
  return (
    <Edit
      title={name}
      getEditData={() => dispatch(getEditSemesterData(id))}
      handleSubmit={handleSubmit(values => dispatch(editSemester(adaptSemesterSubmit(values))))}
      loading={loading}
    >
      <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="BM" name="bm" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="President" name="president" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Concerts" name="concerts" component={RenderSelect} options={concerts} multi />
      <Field label="Songs Performed" name="performed" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Albums" name="albums" component={RenderSelect} options={albums} multi />
      <Field label="Hangovers Graduated" name="graduatingHangs" component={RenderAsync} loadOptions={searchHangovers} multi />
    </Edit>
  );
};

EditSemester.propTypes = {
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
  name: semesterFormatter(state.form[SEMESTER_FORM] && state.form[SEMESTER_FORM].values),
  loading: state.form[SEMESTER_FORM] && state.form[SEMESTER_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: SEMESTER_FORM,
  destroyOnUnmount: false,
})(EditSemester));
