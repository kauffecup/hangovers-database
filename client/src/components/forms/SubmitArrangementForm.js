import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite';
import RenderCreatableAsync from '../form/RenderCreatableAsync';
import RenderField from '../form/RenderField';
import RenderTextArea from '../form/RenderTextArea';
import RenderBinary from '../form/RenderBinary';
import RenderSelect from '../form/RenderSelect';
import RenderAsync from '../form/RenderAsync';
import RenderDropzone from '../form/RenderDropzone';
import RenderMultiField from '../form/RenderMultiField';
import { REGENT_GRAY, PADDING_UNIT, mobilize } from '../../StyleConstants';
import {
  searchHangovers,
  searchArtists,
  searchGenres,
  searchTags,
  searchNonHangovers,
} from '../../actions/search';
import {
  arrangementTypeAdapter,
  semesterAdapter,
  albumAdapter,
  concertAdapter,
  keyAdapter,
} from '../../normalizers/adaptFormData';

const SubmitArrangementForm = ({ app, editName, name, arrangerNotAHangover }) => {
  const { arrangementTypes: at, semesters: s, albums: al, concerts: co, keys: k } = app;
  const arrangementTypes = at.map(arrangementTypeAdapter);
  const semesters = s.map(semesterAdapter);
  const albums = al.map(a => albumAdapter(a));
  const concerts = co.map(c => concertAdapter(c));
  const keys = k.map(keyAdapter);
  return (
    <div>
      <h3 className={css(styles.categoryLabel)}>Song</h3>
      <div className={css(styles.row)}>
        { editName ?
          <Field label="Name" name="name" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} /> :
          <h3 className={css(styles.rowChild)}>{name}</h3>
        }
        <Field label="Abbreviation/Hangs Name" name="alternateName" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <div className={css(styles.row)}>
        <Field label="Original Artist(s)" name="artists" component={RenderCreatableAsync} loadOptions={searchArtists} multi styles={styles.rowChild} />
        <Field label="Year Released" name="whenWritten" component={RenderField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <Field label="Genre(s)" name="genre" component={RenderAsync} loadOptions={searchGenres} multi />
      <h3 className={css(styles.categoryLabel)}>Arrangement</h3>
      <div className={css(styles.row)}>
        <Field label="Arranger(s)" name="arrangers" component={RenderAsync} loadOptions={searchHangovers} multi styles={styles.rowChild} />
        <Field label="Not a Hangover?" name="arrangerNotAHangover" component={RenderField} type="checkbox" />
      </div>
      { arrangerNotAHangover ? <Field label="Non-Hangover Arranger(s)" name="nonHangoverArrangers" component={RenderCreatableAsync} loadOptions={searchNonHangovers} multi /> : null}
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
        <Field
          label="Finale(s)"
          name="finale"
          component={RenderDropzone}
          styles={styles.rowChild}
        />
        <Field
          label="Recording(s)"
          name="recording"
          component={RenderDropzone}
          styles={styles.rowChild}
        />
        <Field
          label="PDF(s)"
          name="pdf"
          component={RenderDropzone}
          styles={styles.rowChild}
        />
      </div>
      <Field label="Youtube Link(s) (Hangovers Performance)" name="youtube" component={RenderMultiField} type="text" autoComplete="off" />
      <div className={css(styles.row)}>
        <Field label="Spotify Link (Original Song)" name="spotifyOriginalLink" component={RenderMultiField} type="text" autoComplete="off" styles={styles.rowChild} />
        <Field label="Spotify Link (Hangovers Version)" name="spotifyHangoverLink" component={RenderMultiField} type="text" autoComplete="off" styles={styles.rowChild} />
      </div>
      <h3 className={css(styles.categoryLabel)}>Odds and Ends</h3>
      <Field label="Tags" name="tags" component={RenderCreatableAsync} loadOptions={searchTags} multi />
      <Field label="Notes" name="notes" component={RenderTextArea} />
    </div>
  );
};

const styles = StyleSheet.create({
  categoryLabel: {
    color: REGENT_GRAY,
    'margin-left': `${PADDING_UNIT}px`,
    ...mobilize({
      'margin-left': 0,
    })
  },
  row: {
    display: 'flex',
    'flex-wrap': 'wrap',
  },
  rowChild: {
    width: '50%',
    ...mobilize({
      width: '50%',
    })
  },
});

SubmitArrangementForm.propTypes = {
  app: PropTypes.object.isRequired,
  editName: PropTypes.bool,
  name: PropTypes.string,
  notAHangover: PropTypes.bool,
};

export default SubmitArrangementForm;
