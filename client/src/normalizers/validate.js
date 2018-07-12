import youtubeRegex from 'youtube-regex';
import { arrangementExists } from '../actions/search';
import { fileFields } from '../shared/FormConstants';

/**
 * Fields are:
 *   song:
 *     name, alternateName, artists, whenWritten, genre
 *   arrangements:
 *     arrangers, key, semesterArranged, arrangementType, syllables
 *   performance:
 *     active, semestersPerformed, concerts, albums, soloists
 *   files and such:
 *     youtube, pdf, finale, recording, spotifyOriginalLink, spotifyHangoverLink
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

  if (!values.key) {
    errors.key = REQUIRED_ERROR;
  }

  if (!values.syllables) {
    errors.syllables = REQUIRED_ERROR;
  }

  if (!(values.youtube || []).every(link => youtubeRegex().test(link))) {
    errors.youtube = 'Enter valid YouTube urls';
  }

  for (const field of fileFields) {
    if (values[field] && values[field].length) {
      const versionMap = {};
      for (const { version = '' } of values[field]) {
        const casedVersion = version.toLowerCase();
        if (versionMap[casedVersion]) {
          errors[field] = 'Cannot have two files with the same version name';
        }
        versionMap[casedVersion] = true;
      }
    }
  }

  if (!(values.pdf  || []).every(file => file.bucketName || file.type === 'application/pdf')) {
    errors.pdf = `PDF${values.pdf.length ? '(s)' : ''} must be a... pdf`;
  }

  if (!(values.recording || []).every(file => file.bucketName || file.type.indexOf('audio') > -1)) {
    errors.recording = 'Recording must be a... recording.';
  }

  return errors;
};

export const asyncValidate = values =>
  arrangementExists(values.name).then((exists) => {
    if (exists) {
      throw { name: 'Arrangement already exists in database.' }; // eslint-disable-line
    }
  });
