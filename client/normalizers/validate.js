import youtubeRegex from 'youtube-regex';
import { arrangementExists } from '../actions/search';

/**
 * Fields are:
 *   song:
 *     name, alternateName, artists, whenWritten, genre
 *   arrangements:
 *     arrangers, key, semesterArranged, arrangementType, syllables
 *   performance:
 *     active, semestersPerformed, concerts, albums, soloists
 *   files and such:
 *     youtube, pdf, finale, mp3, spotifyOriginalLink, spotifyHangoverLink
 *   odds and ends:
 *     notes, tags
 */

const REQUIRED_ERROR = 'Required';

/**
 * Describe certain fields as required.
 * We only do other kinds of validation on the non-dropdown fields
 */
export default (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = REQUIRED_ERROR;
  }

  if (values.whenWritten && !/^[12][0-9]{3}$/.test(values.whenWritten)) {
    errors.whenWritten = 'Enter a valid 4 digit year';
  }

  if (!values.artists) {
    errors.artists = REQUIRED_ERROR;
  }

  if (!values.arrangementType) {
    errors.arrangementType = REQUIRED_ERROR;
  }

  if (!values.syllables) {
    errors.syllables = REQUIRED_ERROR;
  }

  if (!values.active) {
    errors.active = REQUIRED_ERROR;
  }

  if (values.youtube && !youtubeRegex().test(values.youtube)) {
    errors.youtube = 'Enter a valid YouTube url';
  }

  if (!values.pdf) {
    errors.pdf = REQUIRED_ERROR;
  } else if (values.pdf.type !== 'application/pdf') {
    errors.pdf = 'PDF must be a... pdf';
  }

  if (values.mp3 && values.mp3.type !== 'audio/mp3') {
    errors.mp3 = 'mp3 must be a... mp3';
  }

  return errors;
};

export const asyncValidate = values =>
  arrangementExists(values.name).then((exists) => {
    if (exists) {
      throw { name: 'Arrangement already exists in database.' }; // eslint-disable-line
    }
  });
