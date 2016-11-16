const { binaryFields, fileFields, objectArrayFields } = require('../../shared/FormConstants');
const { getArtistID } = require('./IDGenerators');

const NEW_IDENTIFIER = 'new:';


/**
* Adapt a file into a cloudant friendly file
*/
const adaptFile = (data, arrangementName, contentType, dot) => ({
  name: `${arrangementName.toLowerCase().replace(/\s/g, '_')}.${dot}`,
  content_type: contentType,
  data,
});
const fileAdapt = (f, name, dot) => adaptFile(f.buffer, name, f.mimetype, dot);

/**
 * Adapt a files object with pdf/mus/mp3 keys into cloudant friendly files
 */
const adaptFiles = (files, name) => {
  const returnFiles = [];
  if (files.pdf && files.pdf.length) {
    returnFiles.push(fileAdapt(files.pdf[0], name, 'pdf'));
  }
  if (files.finale && files.finale.length) {
    returnFiles.push(fileAdapt(files.finale[0], name, 'mus'));
  }
  if (files.mp3 && files.mp3.length) {
    returnFiles.push(fileAdapt(files.mp3[0], name, 'mp3'));
  }
  return returnFiles;
};

/**
 * Take an arrangement obejct and make it cloudant friendly
 * TODO this second param is SUPER hacky
 */
const adaptArrangement = (arrangement, upsertArtist) => {
  const toUpload = Object.assign({}, arrangement);
  // make sure booleans are actually booleans
  for (const binaryField of binaryFields) {
    toUpload[binaryField] = toUpload[binaryField] === 'true';
  }
  // if these fields are in the arrangement object and not the files object it
  // means we're editing and they are unchanged
  for (const fileField of [...fileFields, '_attachments']) {
    delete toUpload[fileField];
  }
  // make sure array fields are actually arrays - if there's only a single key
  // it'll be treated as a string
  for (const arrayField of objectArrayFields) {
    if (toUpload[arrayField]) {
      toUpload[arrayField] = [].concat(toUpload[arrayField]);
    }
  }
  // in this field we allow the user to define a new artist. if that's what's
  // going down, strip the new identifier and create a new artist object
  if (toUpload.originalArtists) {
    toUpload.originalArtists = [].concat(toUpload.originalArtists).map((oa) => {
      if (oa.indexOf(NEW_IDENTIFIER) > -1) {
        const artistName = oa.substring(oa.indexOf(NEW_IDENTIFIER) + NEW_IDENTIFIER.length);
        const artist = { name: artistName };
        upsertArtist(artist);
        return getArtistID(artist);
      }
      return oa;
    });
  }
  return toUpload;
};

module.exports.adaptFile = adaptFile;
module.exports.adaptFiles = adaptFiles;
module.exports.adaptArrangement = adaptArrangement;
