import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import RenderField from '../../components/form/RenderField';
import { searchArrangements, searchHangovers } from '../../actions/search';
import { albumAdapter, concertAdapter } from '../../normalizers/adaptFormData';

const SubmitSemesterForm = ({ app, editName }) => {
  const { concerts: co, albums: al } = app;
  const concerts = co.map(c => concertAdapter(c));
  const albums = al.map(albumAdapter);
  return (
    <div>
      {editName ? <Field label="Type" name="semester_type" component={RenderSelect} options={[{ value: 'fall', label: 'fall' }, { value: 'spring', label: 'spring' }]} /> : null}
      {editName ? <Field label="Year" name="year" component={RenderField} type="text" autoComplete="off" /> : null}
      <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="BM" name="bm" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="President" name="president" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Concerts" name="concerts" component={RenderSelect} options={concerts} multi />
      <Field label="Songs Performed" name="performed" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Albums" name="albums" component={RenderSelect} options={albums} multi />
      <Field label="Hangovers Graduated" name="graduatingHangs" component={RenderAsync} loadOptions={searchHangovers} multi />
    </div>
  );
};

SubmitSemesterForm.propTypes = {
  app: PropTypes.object.isRequired,
  editName: PropTypes.bool,
};

export default SubmitSemesterForm;
