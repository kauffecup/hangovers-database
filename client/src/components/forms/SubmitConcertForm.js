import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import RenderField from '../../components/form/RenderField';
import {
  searchArrangements,
  searchHangovers,
} from '../../actions/search';
import {
  concertTypeAdapter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

const SubmitConcertForm = ({ app, editName }) => {
  const { concertTypes: ct, semesters: s } = app;
  const concertTypes = ct.map(concertTypeAdapter);
  const semesters = s.map(semesterAdapter);
  return (
    <div>
      {editName ? <Field label="Name" name="name" component={RenderField} type="text" autoComplete="off" /> : null}
      <Field label="Type" name="concertType" component={RenderSelect} options={concertTypes} />
      <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
      <Field label="Set List" name="setList" component={RenderAsync} loadOptions={searchArrangements} multi />
    </div>
  );
};

SubmitConcertForm.propTypes = {
  app: PropTypes.object.isRequired,
  editName: PropTypes.bool,
};

export default SubmitConcertForm;
