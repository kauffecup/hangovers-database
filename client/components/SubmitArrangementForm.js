import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite';
import normalizeFileList from '../normalizers/normalizeFileList';
import adaptSubmit from '../normalizers/adaptSubmit';
import RenderCreatableAsync from './form/RenderCreatableAsync';
import RenderField from './form/RenderField';
import RenderTextArea from './form/RenderTextArea';
import RenderBinary from './form/RenderBinary';
import RenderSelect from './form/RenderSelect';
import RenderAsync from './form/RenderAsync';
import RenderDropzone from './form/RenderDropzone';
import Button from './Button';
import { BERMUDA_GRAY, PADDING_UNIT } from '../StyleConstants';
import {
  searchHangovers,
  searchArtists,
  searchGenres,
  searchTags,
} from '../actions/search';
import {
  arrangementTypeAdapter,
  semesterAdapter,
  albumAdapter,
  concertAdapter,
  keyAdapter,
} from '../normalizers/adaptFormData';

const SubmitArrangementForm = ({ app, submit, handleSubmit, handleDelete, id, rev, edit, name }) => {
  const { arrangementTypes: at, semesters: s, albums: al, concerts: co, keys: k } = app;
  const arrangementTypes = at.map(arrangementTypeAdapter);
  const semesters = s.map(semesterAdapter);
  const albums = al.map(a => albumAdapter(a));
  const concerts = co.map(c => concertAdapter(c));
  const keys = k.map(keyAdapter);
  return (
    <form className={css(styles.form)} onSubmit={handleSubmit(values => submit(adaptSubmit(values)))}>
      <h3 className={css(styles.categoryLabel)}>Song</h3>
      <div className={css(styles.row)}>
        { edit ?
          <h3 className={css(styles.rowChild)}>{name}</h3> :
          <Field label="Name" name="name" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
        }
        <Field label="Abbreviation/Hangs Name" name="alternateName" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <div className={css(styles.row)}>
        <Field label="Original Artist(s)" name="artists" component={RenderCreatableAsync} loadOptions={searchArtists} multi styles={styles.rowChild} />
        <Field label="Year Released" name="whenWritten" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <Field label="Genre(s)" name="genre" component={RenderAsync} loadOptions={searchGenres} multi />
      <h3 className={css(styles.categoryLabel)}>Arrangement</h3>
      <Field label="Arranger(s)" name="arrangers" component={RenderAsync} loadOptions={searchHangovers} multi />
      <div className={css(styles.row)}>
        <Field label="When Arranged" name="semesterArranged" component={RenderSelect} options={semesters} styles={styles.rowChild} />
        <Field label="Key" name="key" component={RenderSelect} options={keys} styles={styles.rowChild} />
      </div>
      <div className={css(styles.row)}>
        <Field label="Type" name="arrangementType" component={RenderSelect} options={arrangementTypes} styles={styles.rowChild} />
        <Field label="Syllables" name="syllables" component={RenderBinary} styles={styles.rowChild} />
      </div>
      <h3 className={css(styles.categoryLabel)}>Performance</h3>
      <Field label="Active" name="active" component={RenderBinary} />
      <Field label="Semester(s) Performed" name="semestersPerformed" component={RenderSelect} options={semesters} multi />
      <Field label="Concert(s) Featured In" name="concerts" component={RenderSelect} options={concerts} multi />
      <Field label="Album(s) Appeared On" name="albums" component={RenderSelect} options={albums} multi />
      <Field label="Soloist(s)" name="soloists" component={RenderAsync} loadOptions={searchHangovers} multi />
      <h3 className={css(styles.categoryLabel)}>Files and Such</h3>
      <div className={css(styles.row)}>
        <Field label="PDF" name="pdf" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
        <Field label="Finale" name="finale" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
        <Field label="Recording" name="recording" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
      </div>
      <Field label="Youtube Link (Hangovers Performance)" name="youtube" component={RenderField} type="text" autoComplete="off" />
      <div className={css(styles.row)}>
        <Field label="Spotify Link (Original Song)" name="spotifyOriginalLink" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
        <Field label="Spotify Link (Hangovers Version)" name="spotifyHangoverLink" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <h3 className={css(styles.categoryLabel)}>Odds and Ends</h3>
      <Field label="Tags" name="tags" component={RenderCreatableAsync} loadOptions={searchTags} multi />
      <Field label="Notes" name="notes" component={RenderTextArea} />
      <Button type="submit" text="Submit" />
      {handleDelete && id && rev ? <Button text="Delete" handleClick={() => handleDelete(id, rev)} error type="button" /> : null}
    </form>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
  },
  categoryLabel: {
    color: BERMUDA_GRAY,
    'margin-left': `${PADDING_UNIT}px`,
  },
  row: {
    display: 'flex',
  },
  rowChild: {
    flex: 1,
  },
});

SubmitArrangementForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  submit: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  id: PropTypes.string,
  rev: PropTypes.string,
  edit: PropTypes.bool,
  name: PropTypes.string,
};

export default SubmitArrangementForm;
