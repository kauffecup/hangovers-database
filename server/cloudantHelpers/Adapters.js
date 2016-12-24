const mime = require('mime-types');
const idgen = require('./IDGenerators');
const types = require('./DBTypes');
const {
  binaryFields,
  fileFields,
  objectArrayFields,
  NEW_IDENTIFIER,
  DELETE_IDENTIFIER,
} = require('../../shared/FormConstants');

const multiRelationshipArrangementFields = [
  { field: 'albums', relationshipField: 'album', type: types.ARRANGEMENT_ALBUMS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementAlbumID },
  { field: 'arrangers', relationshipField: 'hangover', type: types.ARRANGEMENT_ARRANGERS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArrangerID },
  { field: 'artists', relationshipField: 'artist', type: types.ARRANGEMENT_ARTIST_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArtistID },
  { field: 'concerts', relationshipField: 'concert', type: types.ARRANGEMENT_CONCERTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementConcertID },
  { field: 'genre', relationshipField: 'genre', type: types.ARRANGEMENT_GENRE_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementGenreID },
  { field: 'semestersPerformed', relationshipField: 'semester', type: types.ARRANGEMENT_SEMESTERS_PERFORMED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterPerformedID },
  { field: 'soloists', relationshipField: 'hangover', type: types.ARRANGEMENT_SOLOISTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSoloistID },
  { field: 'tags', relationshipField: 'tag', type: types.ARRANGEMENT_TAG_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementTagID },
];

const singleRelationshipArrangementFields = [
  { field: 'semesterArranged', relationshipField: 'semester', type: types.ARRANGEMENT_SEMESTER_ARRANGED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterArrangedID },
];

const multiRelationshipAlbumFields = [
  { field: 'trackList', relationshipField: 'arrangement', type: types.ARRANGEMENT_ALBUMS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementAlbumID, second: true },
];

const singleRelationshipAlbumFields = [
  { field: 'semester', relationshipField: 'semester', type: types.ALBUM_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getAlbumSemesterID },
];

const multiRelationshipArtistFields = [
  { field: 'arrangements', relationshipField: 'arrangement', type: types.ARRANGEMENT_ARTIST_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArtistID, second: true },
];

const multiRelationshipConcertFields = [
  { field: 'md', relationshipField: 'hangover', type: types.MD_CONCERT_RELATIONSHIP_TYPE, idGenerator: idgen.getMDConcertID, second: true },
  { field: 'setList', relationshipField: 'arrangement', type: types.ARRANGEMENT_CONCERTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementConcertID, second: true },
];

const singleRelationshipConcertFields = [
  { field: 'semester', relationshipField: 'semester', type: types.CONCERT_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getConcertSemesterID },
];

const multiRelationshipHangoverFields = [
  { field: 'arranged', relationshipField: 'arrangement', type: types.ARRANGEMENT_ARRANGERS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArrangerID, second: true },
  { field: 'concertsMDed', relationshipField: 'semester', type: types.MD_CONCERT_RELATIONSHIP_TYPE, idGenerator: idgen.getMDConcertID },
  { field: 'graduationSemester', relationshipField: 'semester', type: types.HANGOVER_GRADUATION_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getHangoverGraduationID },
  { field: 'semestersBMed', relationshipField: 'semester', type: types.BM_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getBMSemesterID },
  { field: 'semestersMDed', relationshipField: 'semester', type: types.MD_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getMDSemesterID },
  { field: 'semestersPresided', relationshipField: 'semester', type: types.PRESIDENT_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getPresidentSemesterID },
  { field: 'soloed', relationshipField: 'arrangement', type: types.ARRANGEMENT_SOLOISTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSoloistID, second: true },
];

const multiRelationshipSemesterFields = [
  { field: 'albums', relationshipField: 'album', type: types.ALBUM_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getAlbumSemesterID, second: true },
  { field: 'arrangements', relationshipField: 'arrangement', type: types.ARRANGEMENT_SEMESTER_ARRANGED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterArrangedID, second: true },
  { field: 'bm', relationshipField: 'hangover', type: types.BM_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getBMSemesterID, second: true },
  { field: 'concerts', relationshipField: 'concert', type: types.CONCERT_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getConcertSemesterID, second: true },
  { field: 'md', relationshipField: 'hangover', type: types.MD_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getMDSemesterID, second: true },
  { field: 'performed', relationshipField: 'arrangement', type: types.ARRANGEMENT_SEMESTERS_PERFORMED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterPerformedID, second: true },
  { field: 'president', relationshipField: 'hangover', type: types.PRESIDENT_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getPresidentSemesterID, second: true },
  { field: 'graduatingHangs', relationshipField: 'hangover', type: types.HANGOVER_GRADUATION_SEMESTER_RELATIONSHIP_TYPE, idGenerator: idgen.getHangoverGraduationID, second: true },
];

const multiRelationshipTagFields = [
  { field: 'arrangements', relationshipField: 'arrangement', type: types.ARRANGEMENT_TAG_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementTagID, second: true },
];

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
 * Adapt a files object with pdf/mus/recording keys into cloudant friendly files
 */
const adaptFiles = (files, name) => {
  const returnFiles = [];
  if (files.pdf && files.pdf.length) {
    returnFiles.push(fileAdapt(files.pdf[0], name, 'pdf'));
  }
  if (files.finale && files.finale.length) {
    returnFiles.push(fileAdapt(files.finale[0], name, 'mus'));
  }
  if (files.recording && files.recording.length) {
    returnFiles.push(fileAdapt(files.recording[0], name, mime.extension(files.recording[0].mimetype)));
  }
  return returnFiles;
};

/**
 * Take an arrangement obejct and make it cloudant friendly
 */
const adaptArrangement = (arrangement, files = []) => {
  const toUpload = Object.assign({}, arrangement);
  const arrID = idgen.getArrangementID(toUpload);

  // make sure booleans are actually booleans
  for (const binaryField of binaryFields) {
    toUpload[binaryField] = toUpload[binaryField] === 'true';
  }
  // make sure array fields are actually arrays - if there's only a single key
  // it'll be treated as a string
  for (const arrayField of objectArrayFields) {
    if (toUpload[arrayField]) {
      toUpload[arrayField] = [].concat(toUpload[arrayField]);
    }
  }
  // if these fields are in the arrangement object and not the files object it
  // means we're editing and they are unchanged
  for (const fileField of fileFields) {
    delete toUpload[fileField];
  }
  // file time! parse the _attachments object. if we're going to be uploading
  // a new file of that name, or if the delete identifier is specified, remove
  // that file object from _attachments so that it is removed from cloudant
  if (toUpload._attachments) {
    try {
      toUpload._attachments = JSON.parse(toUpload._attachments);
      for (const { name } of files) {
        delete toUpload._attachments[name];
      }
      for (const key of Object.keys(toUpload._attachments)) {
        if (toUpload._attachments[key] === DELETE_IDENTIFIER) {
          delete toUpload._attachments[key];
        }
      }
    } catch (e) { console.error(e); }
  }
  // in this field we allow the user to define a new artist. if that's what's
  // going down, strip the new identifier and return a new artist object
  const newArtists = [];
  if (toUpload.artists) {
    toUpload.artists = [].concat(toUpload.artists).map((oa) => {
      if (oa.indexOf(NEW_IDENTIFIER) > -1) {
        const artistName = oa.substring(oa.indexOf(NEW_IDENTIFIER) + NEW_IDENTIFIER.length);
        const newArtist = { name: artistName };
        newArtists.push(newArtist);
        return idgen.getArtistID(newArtist);
      }
      return oa;
    });
  }
  // likewise for new tags
  const newTags = [];
  if (toUpload.tags) {
    toUpload.tags = [].concat(toUpload.tags).map((tag) => {
      if (tag.indexOf(NEW_IDENTIFIER) > -1) {
        const tagName = tag.substring(tag.indexOf(NEW_IDENTIFIER) + NEW_IDENTIFIER.length);
        const newTag = { name: tagName };
        newTags.push(newTag);
        return idgen.getTagID(newTag);
      }
      return tag;
    });
  }

  const relationships = adaptRelationships(toUpload, arrID, 'arrangement', multiRelationshipArrangementFields, singleRelationshipArrangementFields);
  return { arrID, toUpload, newArtists, newTags, relationships };
};

/**
 * Take a hangover object and make it cloudant friendly
 */
const adaptAlbum = (album) => {
  const toUpload = Object.assign({}, album);
  const id = idgen.getAlbumID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'album', multiRelationshipAlbumFields, singleRelationshipAlbumFields);
  return { id, toUpload, relationships };
};

/**
 * Take a hangover object and make it cloudant friendly
 */
const adaptArtist = (artist) => {
  const toUpload = Object.assign({}, artist);
  const id = idgen.getArtistID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'artist', multiRelationshipArtistFields);
  return { id, toUpload, relationships };
};

/**
 * Take a hangover object and make it cloudant friendly
 */
const adaptConcert = (concert) => {
  const toUpload = Object.assign({}, concert);
  const id = idgen.getConcertID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'concert', multiRelationshipConcertFields, singleRelationshipConcertFields);
  return { id, toUpload, relationships };
};

/**
 * Take a hangover object and make it cloudant friendly
 */
const adaptHangover = (hangover) => {
  const toUpload = Object.assign({}, hangover);
  const id = idgen.getHangoverID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'hangover', multiRelationshipHangoverFields);
  return { id, toUpload, relationships };
};

/**
 * Take a semester object and make it cloudant friendly
 */
const adaptSemester = (semester) => {
  const toUpload = Object.assign({}, semester);
  const id = idgen.getSemesterID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'semester', multiRelationshipSemesterFields);
  return { id, toUpload, relationships };
};

/**
 * Take a tag object and make it cloudant friendly
 */
const adaptTag = (tag) => {
  const toUpload = Object.assign({}, tag);
  const id = idgen.getTagID(toUpload);
  const relationships = adaptRelationships(toUpload, id, 'tag', multiRelationshipTagFields);
  return { id, toUpload, relationships };
};

/**
 * Iterate over the passed in doc. For the fields, types, and id generators
 * specified in the passed in multiFields and singleFields arrays, create an
 * array that identifies all of the relationships for the given doc. As we do
 * this, delete the field that we used to generate these relationships from the
 * doc, as the relationships array is sufficient to identify what's going on.
 */
const adaptRelationships = (myDoc, id, myRelationshipField, multiFields = [], singleFields = []) => {
  const relationships = [];
  for (const { field, relationshipField, type, idGenerator, second } of multiFields) {
    if (myDoc[field] && myDoc[field].length) {
      for (const thingID of myDoc[field]) {
        const doc = { [relationshipField]: thingID, [myRelationshipField]: id };
        relationships.push({ doc, type, id: idGenerator(second ? thingID : id, second ? id : thingID) });
      }
    }
    delete myDoc[field]; // eslint-disable-line
  }
  for (const { field, relationshipField, type, idGenerator, second } of singleFields) {
    if (myDoc[field]) {
      const doc = { [relationshipField]: myDoc[field], [myRelationshipField]: id };
      relationships.push({ doc, type, id: idGenerator(second ? myDoc[field] : id, second ? id : myDoc[field]) });
    }
    delete myDoc[field]; // eslint-disable-line
  }
  return relationships;
};

module.exports.adaptFile = adaptFile;
module.exports.adaptFiles = adaptFiles;
module.exports.adaptArrangement = adaptArrangement;
module.exports.adaptAlbum = adaptAlbum;
module.exports.adaptArtist = adaptArtist;
module.exports.adaptConcert = adaptConcert;
module.exports.adaptHangover = adaptHangover;
module.exports.adaptSemester = adaptSemester;
module.exports.adaptTag = adaptTag;
