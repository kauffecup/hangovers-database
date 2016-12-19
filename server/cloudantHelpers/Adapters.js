const mime = require('mime-types');
const { binaryFields, fileFields, objectArrayFields, NEW_IDENTIFIER } = require('../../shared/FormConstants');
const idgen = require('./IDGenerators');
const types = require('./DBTypes');

const multiRelationshipFields = [
  { field: 'albums', relationshipField: 'album', type: types.ARRANGEMENT_ALBUMS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementAlbumID },
  { field: 'arrangers', relationshipField: 'hangover', type: types.ARRANGEMENT_ARRANGERS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArrangerID },
  { field: 'artists', relationshipField: 'artist', type: types.ARRANGEMENT_ARTIST_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementArtistID },
  { field: 'concerts', relationshipField: 'concert', type: types.ARRANGEMENT_CONCERTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementConcertID },
  { field: 'genre', relationshipField: 'genre', type: types.ARRANGEMENT_GENRE_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementGenreID },
  { field: 'semestersPerformed', relationshipField: 'semester', type: types.ARRANGEMENT_SEMESTERS_PERFORMED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterPerformedID },
  { field: 'soloists', relationshipField: 'hangover', type: types.ARRANGEMENT_SOLOISTS_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSoloistID },
  { field: 'tags', relationshipField: 'tag', type: types.ARRANGEMENT_TAG_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementTagID },
];

const singleRelationshipFields = [
  { field: 'semesterArranged', relationshipField: 'semester', type: types.ARRANGEMENT_SEMESTER_ARRANGED_RELATIONSHIP_TYPE, idGenerator: idgen.getArrangementSemesterArrangedID },
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
const adaptArrangement = (arrangement) => {
  const toUpload = Object.assign({}, arrangement);
  const arrID = idgen.getArrangementID(toUpload);
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

  // now we figure out the relationships for this arrangement. as we build the
  // relationships, we consolidate them into one array and remove the field from
  // the arrangement we're adapting. the relationship is sufficient!
  const relationships = [];
  for (const { field, relationshipField, type, idGenerator } of multiRelationshipFields) {
    if (toUpload[field] && toUpload[field].length) {
      for (const thingID of toUpload[field]) {
        const doc = { [relationshipField]: thingID, arrangement: arrID };
        relationships.push({ doc, type, id: idGenerator(arrID, thingID) });
      }
      delete toUpload[field];
    }
  }
  for (const { field, relationshipField, type, idGenerator } of singleRelationshipFields) {
    if (toUpload[field]) {
      const doc = { [relationshipField]: toUpload[field], arrangement: arrID };
      relationships.push({ doc, type, id: idGenerator(arrID, toUpload[field]) });
      delete toUpload[field];
    }
  }

  return { arrID, toUpload, newArtists, newTags, relationships };
};

module.exports.adaptFile = adaptFile;
module.exports.adaptFiles = adaptFiles;
module.exports.adaptArrangement = adaptArrangement;
