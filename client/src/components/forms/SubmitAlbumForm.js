import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { searchArrangements } from '../../actions/search';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import RenderField from '../form/RenderField';
import {
  albumFormatAdapter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

const SubmitAlbumForm = ({ app, editName }) => {
  const { albumFormats: af, semesters: s } = app;
  const albumFormats = af.map(albumFormatAdapter);
  const semesters = s.map(semesterAdapter);
  return (
    <div>
      {editName ? <Field label="Name" name="name" component={RenderField} type="text" autoComplete="off" /> : null}
      <Field label="Format" name="format" component={RenderSelect} options={albumFormats} multi />
      <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
      <Field label="Track List" name="trackList" component={RenderAsync} loadOptions={searchArrangements} multi />
    </div>
  );
};

SubmitAlbumForm.propTypes = {
  app: PropTypes.object.isRequired,
  editName: PropTypes.bool,
};

export default SubmitAlbumForm;
