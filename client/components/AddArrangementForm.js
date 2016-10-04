import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import normalizeFileList from '../normalizers/normalizeFileList';

const AddArrangementForm = ({ handleSubmit, onSubmit }) =>
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
      <Field name="originalArtist" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="whenWritten">When Written</label>
      <Field name="whenWritten" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="genre">Genre</label>
      <Field name="genre" component="input" type="text" />
    </div>
    <h3>The Arrangement</h3>
    <div>
      <label htmlFor="arrangers">Arranger(s)</label>
      <Field name="arrangers" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="key">Key</label>
      <Field name="key" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="whenArranged">When Arranged</label>
      <Field name="whenArranged" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="type">Type</label>
      <Field name="type" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="quality">Quality of Arrangement</label>
      <Field name="quality" component="input" type="text" />
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
      <label htmlFor="whenPerformed">What Semester Performed</label>
      <Field name="whenPerformed" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="concerts">Concerts Performed In</label>
      <Field name="concerts" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="albums">Albums Appeared On</label>
      <Field name="albums" component="input" type="text" />
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
};

export default reduxForm({
  form: 'addArrangement',
})(AddArrangementForm);
