import youtubeRegex from 'youtube-regex';

/**
 * Fields are:
 *   song:
 *     arrangementName, alternateName, originalArtist, whenWritten, genre
 *   arrangements:
 *     arrangers, key, whenArranged, type, quality, syllables
 *   performance:
 *     whenPerformed, concerts, albums, soloists
 *   files and such:
 *     youtube, pdf, finale
 */

const REQUIRED_ERROR = 'Required';

/**
 * Describe certain fields as required.
 * We only do other kinds of validation on the non-dropdown fields
 */
export default (values) => {
  const errors = {};
  if (!values.arrangementName) {
    errors.arrangementName = REQUIRED_ERROR;
  }

  if (values.whenWritten && !/^[12][0-9]{3}$/.test(values.whenWritten)) {
    errors.whenWritten = 'Enter a valid 4 digit year';
  }

  if (!values.originalArtist) {
    errors.originalArtist = REQUIRED_ERROR;
  }

  if (!values.arrangers || !values.arrangers.length) {
    errors.arrangers = REQUIRED_ERROR;
  }

  if (!values.key) {
    errors.key = REQUIRED_ERROR;
  }

  if (!values.type) {
    errors.type = REQUIRED_ERROR;
  }

  if (!values.quality) {
    errors.quality = REQUIRED_ERROR;
  }

  if (!values.syllables) {
    errors.syllables = REQUIRED_ERROR;
  }

  if (values.youtube && !youtubeRegex().test(values.youtube)) {
    errors.youtube = 'Enter a valid YouTube url';
  }

  if (!values.pdf || !values.pdf.length) {
    errors.pdf = REQUIRED_ERROR;
  }

  return errors;
};
