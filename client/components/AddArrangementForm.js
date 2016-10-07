import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Select, { AsyncCreatable, Async } from 'react-select';
import normalizeFileList from '../normalizers/normalizeFileList';

const SelectWrapper = props =>
  <Select
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

const AsyncWrapper = props =>
  <Async
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

const CreatableWrapper = props =>
  <AsyncCreatable
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

SelectWrapper.propTypes = {
  input: PropTypes.object,
};

AsyncWrapper.propTypes = {
  input: PropTypes.object,
};

CreatableWrapper.propTypes = {
  input: PropTypes.object,
};

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
    <div>
      <label htmlFor="arrangementName">Name</label>
      <Field name="arrangementName" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="alternateName">Alternate Name</label>
      <Field name="alternateName" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="originalArtist">Original Artist(s)</label>
      <Field name="originalArtist" component={CreatableWrapper} loadOptions={artistsLoadOptions} multi />
    </div>
    <div>
      <label htmlFor="whenWritten">Year Released</label>
      <Field name="whenWritten" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="genre">Genre</label>
      <Field name="genre" component={SelectWrapper} options={genres} />
    </div>
    <h3>The Arrangement</h3>
    <div>
      <label htmlFor="arrangers">Arranger(s)</label>
      <Field name="arrangers" component={AsyncWrapper} loadOptions={hangoversLoadOptions} multi />
    </div>
    <div>
      <label htmlFor="key">Key</label>
      <Field name="key" component={SelectWrapper} options={keys} />
    </div>
    <div>
      <label htmlFor="whenArranged">When Arranged</label>
      <Field name="whenArranged" component={SelectWrapper} options={semesters} />
    </div>
    <div>
      <label htmlFor="type">Type</label>
      <Field name="type" component={SelectWrapper} options={arrangementTypes} />
    </div>
    <div>
      <label htmlFor="quality">Quality of Arrangement</label>
      <Field name="quality" component={SelectWrapper} options={qualities} />
    </div>
    <div>
      <label htmlFor="syllables">Syllables</label>
      <div>
        <label htmlFor="syllables"><Field name="syllables" component="input" type="radio" value="yes" />Yes</label>
        <label htmlFor="syllables"><Field name="syllables" component="input" type="radio" value="no" />No</label>
      </div>
    </div>
    <h3>Performances</h3>
    <div>
      <label htmlFor="whenPerformed">Semester(s) Performed</label>
      <Field name="whenPerformed" component={SelectWrapper} options={semesters} multi />
    </div>
    <div>
      <label htmlFor="concerts">Concert(s) Featured In</label>
      <Field name="concerts" component={SelectWrapper} options={concerts} multi />
    </div>
    <div>
      <label htmlFor="albums">Album(s) Appeared On</label>
      <Field name="albums" component={SelectWrapper} options={albums} multi />
    </div>
    <div>
      <label htmlFor="soloists">Soloist(s)</label>
      <Field name="soloists" component={AsyncWrapper} loadOptions={hangoversLoadOptions} multi />
    </div>
    <h3>Files and Such</h3>
    <div>
      <label htmlFor="youtube">Youtube Link</label>
      <Field name="youtube" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="pdf">PDF</label>
      <Field name="pdf" component="input" type="file" normalize={normalizeFileList} />
    </div>
    <div>
      <label htmlFor="finale">Finale</label>
      <Field name="finale" component="input" type="file" normalize={normalizeFileList} />
    </div>
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

export default reduxForm({
  form: 'addArrangement',
})(AddArrangementForm);
