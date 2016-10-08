import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Select, { AsyncCreatable, Async } from 'react-select';
import normalizeFileList from '../normalizers/normalizeFileList';
import validate from '../normalizers/validate';

const _RenderField = ({ input, label, type }) =>
  <input {...input} placeholder={label} type={type} />;

const _RenderBinary = ({ name }) =>
  <div>
    <label htmlFor={name}><Field name={name} component="input" type="radio" value="yes" />Yes</label>
    <label htmlFor={name}><Field name={name} component="input" type="radio" value="no" />No</label>
  </div>;

const _RenderSelect = props =>
  <Select
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

const _RenderAsync = props =>
  <Async
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

const _RenderCreatableAsync = props =>
  <AsyncCreatable
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

const _Render = Component => (props) => {
  const { label, type, name, meta: { touched, error } } = props; // eslint-disable-line
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Component {...props} />
      {touched && error && <div>{error}</div>}
    </div>
  );
};

const RenderField = _Render(_RenderField);
const RenderBinary = _Render(_RenderBinary);
const RenderSelect = _Render(_RenderSelect);
const RenderAsync = _Render(_RenderAsync);
const RenderCreatableAsync = _Render(_RenderCreatableAsync);

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
    <button type="submit">Submit</button>
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

_RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

_RenderBinary.propTypes = {
  name: PropTypes.string.isRequired,
};

_RenderSelect.propTypes = {
  input: PropTypes.object.isRequired,
};

_RenderAsync.propTypes = {
  input: PropTypes.object.isRequired,
};

_RenderCreatableAsync.propTypes = {
  input: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'addArrangement',
  validate,
})(AddArrangementForm);
