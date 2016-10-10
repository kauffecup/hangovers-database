import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import normalizeFileList from '../normalizers/normalizeFileList';
import validate from '../normalizers/validate';
import RenderCreatableAsync from './RenderCreatableAsync';
import RenderField from './RenderField';
import RenderBinary from './RenderBinary';
import RenderSelect from './RenderSelect';
import RenderAsync from './RenderAsync';
import Button from './Button';

const AddArrangementForm = ({
  handleSubmit,
  onSubmit,
  hangoversLoadOptions,
  artistsLoadOptions,
  arrangementTypes,
  qualities,
  keys,
  semesters,
  albums,
  concerts,
  genres,
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <h3>The Song</h3>
    <Field label="Name" name="arrangementName" component={RenderField} type="text" />
    <Field label="Alternate Name" name="alternateName" component={RenderField} type="text" />
    <Field label="Original Artist(s)" name="originalArtist" component={RenderCreatableAsync} loadOptions={artistsLoadOptions} multi />
    <Field label="Year Released" name="whenWritten" component={RenderField} type="text" />
    <Field label="Genre" name="genre" component={RenderSelect} options={genres} />
    <h3>The Arrangement</h3>
    <Field label="Arranger(s)" name="arrangers" component={RenderAsync} loadOptions={hangoversLoadOptions} multi />
    <Field label="Key" name="key" component={RenderSelect} options={keys} />
    <Field label="When Arranged" name="whenArranged" component={RenderSelect} options={semesters} />
    <Field label="Type" name="type" component={RenderSelect} options={arrangementTypes} />
    <Field label="Quality of Arrangement" name="quality" component={RenderSelect} options={qualities} />
    <Field label="Syllables" name="syllables" component={RenderBinary} />
    <h3>Performances</h3>
    <Field label="Semester(s) Performed" name="whenPerformed" component={RenderSelect} options={semesters} multi />
    <Field label="Concert(s) Featured In" name="concerts" component={RenderSelect} options={concerts} multi />
    <Field label="Album(s) Appeared On" name="albums" component={RenderSelect} options={albums} multi />
    <Field label="Soloist(s)" name="soloists" component={RenderAsync} loadOptions={hangoversLoadOptions} multi />
    <h3>Files and Such</h3>
    <Field label="Youtube Link" name="youtube" component={RenderField} type="text" />
    <Field label="PDF" name="pdf" component={RenderField} type="file" normalize={normalizeFileList} />
    <Field label="Finale" name="finale" component={RenderField} type="file" normalize={normalizeFileList} />
    <Button type="submit" text="Submit" />
  </form>;

AddArrangementForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hangoversLoadOptions: PropTypes.func.isRequired,
  artistsLoadOptions: PropTypes.func.isRequired,
  arrangementTypes: PropTypes.array.isRequired,
  qualities: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  semesters: PropTypes.array.isRequired,
  albums: PropTypes.array.isRequired,
  concerts: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'addArrangement',
  validate,
})(AddArrangementForm);
