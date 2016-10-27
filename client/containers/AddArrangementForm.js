import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite';
import normalizeFileList from '../normalizers/normalizeFileList';
import adaptSubmit from '../normalizers/adaptSubmit';
import validate from '../normalizers/validate';
import RenderCreatableAsync from '../components/form/RenderCreatableAsync';
import RenderField from '../components/form/RenderField';
import RenderBinary from '../components/form/RenderBinary';
import RenderSelect from '../components/form/RenderSelect';
import RenderAsync from '../components/form/RenderAsync';
import RenderDropzone from '../components/form/RenderDropzone';
import Button from '../components/Button';
import {
  submitArrangement,
  searchHangovers,
  searchArtists,
} from '../actions';
import {
  arrangementAdapter,
  qualityAdapter,
  semesterAdapter,
  albumAdapter,
  concertAdapter,
  genreAdapter,
  keyAdapter,
} from '../normalizers/adaptFormData';

const AddArrangementForm = ({ app, handleSubmit }) => {
  const { semesterMap, arrangementTypes: at, qualities: q, semesters: s, albums: al, concerts: co, genres: g, keys: k } = app;
  const arrangementTypes = at.map(arrangementAdapter);
  const qualities = q.map(qualityAdapter);
  const semesters = s.map(semesterAdapter);
  const albums = al.map(a => albumAdapter(a, semesterMap));
  const concerts = co.map(c => concertAdapter(c, semesterMap));
  const genres = g.map(genreAdapter);
  const keys = k.map(keyAdapter);
  return (
    <form onSubmit={handleSubmit(values => submitArrangement(adaptSubmit(values)))}>
      <h3>The Song</h3>
      <div className={css(styles.row)}>
        <Field label="Name" name="name" component={RenderField} type="text" styles={styles.rowChild} />
        <Field label="Alternate Name" name="alternateName" component={RenderField} type="text" styles={styles.rowChild} />
      </div>
      <Field label="Original Artist(s)" name="originalArtists" component={RenderCreatableAsync} loadOptions={searchArtists} multi />
      <div className={css(styles.row)}>
        <Field label="Genre" name="genre" component={RenderSelect} options={genres} styles={styles.rowChild} />
        <Field label="Year Released" name="whenWritten" component={RenderField} type="text" styles={styles.rowChild} />
      </div>
      <h3>The Arrangement</h3>
      <Field label="Arranger(s)" name="arrangers" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="When Arranged" name="whenArranged" component={RenderSelect} options={semesters} />
      <div className={css(styles.row)}>
        <Field label="Key" name="key" component={RenderSelect} options={keys} styles={styles.rowChild} />
        <Field label="Syllables" name="syllables" component={RenderBinary} styles={styles.rowChild} />
      </div>
      <div className={css(styles.row)}>
        <Field label="Type" name="arrangementType" component={RenderSelect} options={arrangementTypes} styles={styles.rowChild} />
        <Field label="Quality of Arrangement" name="quality" component={RenderSelect} options={qualities} styles={styles.rowChild} />
      </div>
      <h3>Performances</h3>
      <Field label="Semester(s) Performed" name="whenPerformed" component={RenderSelect} options={semesters} multi />
      <Field label="Concert(s) Featured In" name="concerts" component={RenderSelect} options={concerts} multi />
      <Field label="Album(s) Appeared On" name="albums" component={RenderSelect} options={albums} multi />
      <Field label="Soloist(s)" name="soloists" component={RenderAsync} loadOptions={searchHangovers} multi />
      <h3>Files and Such</h3>
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
    </form>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
  },
  rowChild: {
    flex: 1,
  },
});

AddArrangementForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
};

// for now, we want it all!
const mapStateToProps = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'addArrangement',
  destroyOnUnmount: false,
  validate,
})(AddArrangementForm));
