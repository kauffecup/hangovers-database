import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite';
import normalizeFileList from '../normalizers/normalizeFileList';
import adaptSubmit from '../normalizers/adaptSubmit';
import RenderCreatableAsync from './form/RenderCreatableAsync';
import RenderField from './form/RenderField';
import RenderBinary from './form/RenderBinary';
import RenderSelect from './form/RenderSelect';
import RenderAsync from './form/RenderAsync';
import RenderDropzone from './form/RenderDropzone';
import Button from './Button';
import { BERMUDA_GRAY, PADDING_UNIT } from '../StyleConstants';
import {
  searchHangovers,
  searchArtists,
} from '../actions';
import {
  arrangementTypeAdapter,
  semesterAdapter,
  albumAdapter,
  concertAdapter,
  genreAdapter,
  keyAdapter,
} from '../normalizers/adaptFormData';

const SubmitArrangementForm = ({ app, submit, handleSubmit, handleDelete, id, rev }) => {
  const { semesterMap, arrangementTypes: at, semesters: s, albums: al, concerts: co, genres: g, keys: k } = app;
  const arrangementTypes = at.map(arrangementTypeAdapter);
  const semesters = s.map(semesterAdapter);
  const albums = al.map(a => albumAdapter(a, semesterMap));
  const concerts = co.map(c => concertAdapter(c, semesterMap));
  const genres = g.map(genreAdapter);
  const keys = k.map(keyAdapter);
  return (
    <form className={css(styles.form)} onSubmit={handleSubmit(values => submit(adaptSubmit(values)))}>
      <h3 className={css(styles.categoryLabel)}>The Song</h3>
      <div className={css(styles.row)}>
        <Field label="Name" name="name" component={RenderField} type="text" styles={styles.rowChild} />
        <Field label="Abbreviation" name="abbreviation" component={RenderField} type="text" styles={styles.rowChild} />
      </div>
      <Field label="Original Artist(s)" name="originalArtists" component={RenderCreatableAsync} loadOptions={searchArtists} multi />
      <div className={css(styles.row)}>
        <Field label="Genre" name="genre" component={RenderSelect} options={genres} styles={styles.rowChild} />
        <Field label="Year Released" name="whenWritten" component={RenderField} type="text" styles={styles.rowChild} />
      </div>
      <h3 className={css(styles.categoryLabel)}>The Arrangement</h3>
      <Field label="Arranger(s)" name="arrangers" component={RenderAsync} loadOptions={searchHangovers} multi />
      <div className={css(styles.row)}>
        <Field label="When Arranged" name="whenArranged" component={RenderSelect} options={semesters} styles={styles.rowChild} />
        <Field label="Key" name="key" component={RenderSelect} options={keys} styles={styles.rowChild} />
      </div>
      <div className={css(styles.row)}>
        <Field label="Type" name="arrangementType" component={RenderSelect} options={arrangementTypes} styles={styles.rowChild} />
        <Field label="Syllables" name="syllables" component={RenderBinary} styles={styles.rowChild} />
      </div>
      <h3 className={css(styles.categoryLabel)}>Performances</h3>
      <Field label="Active" name="active" component={RenderBinary} />
      <Field label="Semester(s) Performed" name="whenPerformed" component={RenderSelect} options={semesters} multi />
      <Field label="Concert(s) Featured In" name="concerts" component={RenderSelect} options={concerts} multi />
      <Field label="Album(s) Appeared On" name="albums" component={RenderSelect} options={albums} multi />
      <Field label="Soloist(s)" name="soloists" component={RenderAsync} loadOptions={searchHangovers} multi />
      <h3 className={css(styles.categoryLabel)}>Files and Such</h3>
      <div className={css(styles.row)}>
        <Field label="PDF" name="pdf" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
        <Field label="Finale" name="finale" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
        <Field label="mp3" name="mp3" component={RenderDropzone} normalize={normalizeFileList} styles={styles.rowChild} />
      </div>
      <Field label="Youtube Link" name="youtube" component={RenderField} type="text" />
      <div className={css(styles.row)}>
        <Field label="Spotify Link (Original Song)" name="spotifyOriginalLink" component={RenderField} type="text" styles={styles.rowChild} />
        <Field label="Spotify Link (Hangovers Version)" name="spotifyHangoverLink" component={RenderField} type="text" styles={styles.rowChild} />
      </div>
      <Button type="submit" text="Submit" />
      {handleDelete && id && rev ? <Button text="Delete" handleClick={() => handleDelete(id, rev)} error type="button" /> : null}
    </form>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    'overflow-y': 'auto',
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
};

export default SubmitArrangementForm;
