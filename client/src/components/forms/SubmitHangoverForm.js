import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { searchArrangements } from '../../actions/search';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import RenderField from '../../components/form/RenderField';
import { semesterAdapter, concertAdapter } from '../../normalizers/adaptFormData';

const SubmitHangoverForm = ({ app, editName }) => {
  const { semesters: s, concerts: co } = app;
  const semesters = s.map(semesterAdapter);
  const concerts = co.map(c => concertAdapter(c));
  return (
    <div>
      {editName ? <Field label="First Name" name="firstName" component={RenderField} type="text" autoComplete="off" /> : null}
      {editName ? <Field label="Hangs Name" name="hangsName" component={RenderField} type="text" autoComplete="off" /> : null}
      {editName ? <Field label="Last Name" name="lastName" component={RenderField} type="text" autoComplete="off" /> : null}
      <Field label="Graduated" name="graduationSemester" component={RenderSelect} options={semesters} multi />
      <Field label="Concert(s) MDed" name="concertsMDed" component={RenderSelect} options={concerts} multi />
      <Field label="Semester(s) MDed" name="semestersMDed" component={RenderSelect} options={semesters} multi />
      <Field label="Semester(s) BMed" name="semestersBMed" component={RenderSelect} options={semesters} multi />
      <Field label="Semester(s) Presided" name="semestersPresided" component={RenderSelect} options={semesters} multi />
      <Field label="Arranged" name="arranged" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Soloed" name="soloed" component={RenderAsync} loadOptions={searchArrangements} multi />
    </div>
  );
};

SubmitHangoverForm.propTypes = {
  app: PropTypes.object.isRequired,
  editName: PropTypes.bool,
};

export default SubmitHangoverForm;
