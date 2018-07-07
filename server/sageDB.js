const Promise = require('bluebird');
const cloudant = require('@cloudant/cloudant');
const types = require('./cloudantHelpers/DBTypes');
const idgen = require('./cloudantHelpers/IDGenerators');
const cloudantConfig = require('../config/cloudantConfig');
const {
  adaptAlbum,
  adaptArrangement,
  adaptArtist,
  adaptConcert,
  adaptHangover,
  adaptSemester,
  adaptTag,
  adaptNonHangover,
} = require('./cloudantHelpers/Adapters');

const LIMIT = 20;
const OPTS = { concurrency: 3 };

const c = cloudant({
  account: cloudantConfig.username,
  password: cloudantConfig.password,
  maxAttempt: 5,
  plugins: { retry: { retryErrors: false, retryStatusCodes: [ 429 ] } }
});
let _sageDB = Promise.promisifyAll(c.use('sage'));

const initialize = () => new Promise((resolve, reject) => {
  const c = cloudant({ account: cloudantConfig.username, password: cloudantConfig.password });
  c.db.create('sage', (e) => {
    if (!e || (e && e.error === 'file_exists')) {
      _sageDB = Promise.promisifyAll(c.use('sage'));
      resolve();
    } else {
      console.error(e);
      reject(e);
    }
  });
})

const addIndex = (index) => _sageDB.indexAsync(index);

/**
 * Getters for retrieving a "full" object and rolling up similar key fields
 * into an array.
 */
const getFullArrangement = arrangementID => _getFullArrayRollup(arrangementID, 'arrangement', ['arrangementType', 'key', 'semesterArranged']);
const getFullHangover = hangoverID => _getFullArrayRollup(hangoverID, 'hangover');
const getFullSemester = semesterID => _getFullArrayRollup(semesterID, 'semester');
const getFullConcert = concertID => _getFullArrayRollup(concertID, 'concert', ['concertType', 'semester']);
const getFullAlbum = albumID => _getFullArrayRollup(albumID, 'album', ['semester']);
const getFullArtist = artistID => _getFullArrayRollup(artistID, 'artist');
const getFullTag = tagID => _getFullArrayRollup(tagID, 'tag');
const getFullNonHangover = nonHangoverID => _getFullArrayRollup(nonHangoverID, 'non_hangover');
const getArrangementFiles = arrangementID =>
  _sageDB.getAsync(arrangementID).then(({ pdf, recording, finale }) => ({ pdf, recording, finale }));

/**
 * Here we get a document's metadata along with the original docs for any ids
 * it might link to. We have some cleanup logic for combining into a clean array.
 */
const _getFullArrayRollup = (id, view, flatten = []) => _sageDB.viewAsync('full', view, {
  include_docs: true,
  startkey: [id],
  endkey: [id, {}],
  limit: 200,
}).then(({ rows }) => {
  if (!rows || !rows.length) {
    throw new Error('I still haven\'t found what I\'m looking for');
  }
  const doc = rows[0].doc;  // TODO: is this always true?
  const docArrays = {};
  for (let i = 1; i < rows.length; i++) {
    const rowKey = rows[i].key;
    const rowDoc = rows[i].doc;
    if (rowDoc && rowKey.length === 2) {
      if (!docArrays[rowKey[1]]) {
        docArrays[rowKey[1]] = [];
      }
      docArrays[rowKey[1]].push(rowDoc);
    }
  }
  for (const arrayName of Object.keys(docArrays)) {
    doc[arrayName] = docArrays[arrayName];
  }
  for (const flattenField of flatten) {
    if (doc[flattenField] && doc[flattenField][0]) {
      doc[flattenField] = doc[flattenField][0];
    }
  }
  return doc;
});

/** Resolves with true if an arrangement exists, false otherwise */
const arrangementExists = (name = '') => new Promise((resolve, reject) =>
  _sageDB.getAsync(idgen.getArrangementID({ name }))
    .then(() => resolve(true))
    .catch(e => e.error === 'not_found' ? resolve(false) : reject(e))
);

/**
 * Getters for all the types defined above. Each method returns a promise that
 * resolves with the response from cloudant. We do processing on the rows to
 * return the doc.
 */
const getAlbumFormats = (limit, skip) => _view('album_formats', limit, skip);
const getArrangements = (limit, skip) => _view('arrangements', limit, skip);
const getArrangementTypes = (limit, skip) => _view('arrangement_types', limit, skip);
const getArtists = (limit, skip) => _view('artists', limit, skip);
const getConcertTypes = (limit, skip) => _view('concert_types', limit, skip);
const getGenres = (limit, skip) => _view('genres', limit, skip);
const getHangovers = (limit, skip) => _view('hangovers', limit, skip);
const getKeys = (limit, skip) => _view('keys', limit, skip);
const getSemesters = (limit, skip) => _view('semesters', limit, skip);
const getTags = (limit, skip) => _view('tags', limit, skip);
// these views also have semester data we need to roll in
const getAlbums = (limit, skip) => _viewWithSemester('albums', types.ALBUM_TYPE, limit, skip);
const getConcerts = (limit, skip) => _viewWithSemester('concerts', types.CONCERT_TYPE, limit, skip);

/** Helper method for above getters */
const _view = (type, limit = LIMIT, skip = 0) => _sageDB.viewAsync('types', type, {
  include_docs: true,
  limit,
  skip,
}).then(response => Object.assign({}, response, {
  rows: response.rows.map(r => r.doc),
}));

/** Get all of a kind of view along with its semester data, roll the semester data into doc data */
const _viewWithSemester = (type, docType, limit = LIMIT, skip = 0) => _sageDB.viewAsync('types', type, {
  include_docs: true,
  limit,
  skip,
}).then((response) => {
  const docs = [];
  const docMap = {};
  const semesters = [];
  for (const row of (response.rows || [{}])) {
    if (row.doc.type === docType) {
      docMap[row.doc._id] = row.doc;
    } else if (row.key.length === 2) {
      semesters.push({
        docID: row.key[0],
        semester: row.doc,
      });
    }
  }
  for (const { docID, semester } of semesters) {
    docs.push(Object.assign({}, docMap[docID], { semester }));
  }
  return Object.assign({}, response, { rows: docs });
});

/**
 * Searchers for indexed types
 */
const searchArtists = (text = '') => _search('artists', `name:(${text.toLowerCase()}*)`);
const searchArrangements = (text = '') => _search('arrangements', `name:(${text.toLowerCase()}*)`);
const searchGenres = (text = '') => _search('genres', `name:(${text.toLowerCase()}*)`);
const searchHangovers = (text = '') => _search('hangovers', `nameString:(${text.toLowerCase()}*)`);
const searchRelationships = (field, id) => _search('relationships', `${field}:${id}`, 200);
const searchTags = (text = '') => _search('tags', `name:(${text.toLowerCase()}*)`);
const searchNonHangovers = (text = '') => _search('non_hangovers', `name:(${text.toLowerCase()}*)`);

/** Helper method for the above searchers */
const _search = (index, q, limit = LIMIT) => _sageDB.searchAsync('search', index, {
  q,
  limit,
  include_docs: true,
}).then(response => (response.rows || []).map(r => r.doc));

/** Upserts for given doc types without relationships */
const upsertArrangementType = (at) => _upsertType(at, types.ARRANGEMENT_TYPE_TYPE, idgen.getArrangementTypeID(at));
const upsertAlbumFormat = (af) => _upsertType(af, types.ALBUM_FORMAT_TYPE, idgen.getAlbumFormatID(af));
const upsertConcertType = (ct) => _upsertType(ct, types.CONCERT_TYPE_TYPE, idgen.getConcertTypeID(ct));
const upsertGenre = (g) => _upsertType(g, types.GENRE_TYPE, idgen.getGenreID(g));
const upsertKey = (k) => _upsertType(k, types.KEY_TYPE, idgen.getKeyID(k));
/** Upserts for doc types with relationships */
const upsertAlbum = (a) => _upsertWithRelationships(a, adaptAlbum, types.ALBUM_TYPE, 'album');
const upsertArtist = (a) => _upsertWithRelationships(a, adaptArtist, types.ARTIST_TYPE, 'artist');
const upsertConcert = (c) => _upsertWithRelationships(c, adaptConcert, types.CONCERT_TYPE, 'concert');
const upsertHangover = (h) => _upsertWithRelationships(h, adaptHangover, types.HANGOVER_TYPE, 'hangover');
const upsertSemester = (s) => _upsertWithRelationships(s, adaptSemester, types.SEMESTER_TYPE, 'semester');
const upsertTag = (t) => _upsertWithRelationships(t, adaptTag, types.TAG_TYPE, 'tag');
const upsertNonHangover = (t) => _upsertWithRelationships(t, adaptNonHangover, types.NON_HANGOVER_TYPE, 'nonHangover');
const upsertArrangement = (arrangement, adaptedFiles = {}, deletedFiles = {}) => {
  const { arrID, toUpload, newArtists = [], newTags = [], newNonHangovers = [], relationships = [] } = adaptArrangement(arrangement, adaptedFiles, deletedFiles);
  console.log('creating new artists, tags, and nonHangovers');
  return Promise.join(
    Promise.map(newArtists, a => upsertArtist(a), OPTS),
    Promise.map(newTags, t => upsertTag(t), OPTS),
    Promise.map(newNonHangovers, nh => upsertNonHangover(nh), OPTS),
    () => {}
  ).then(() => {
    console.log('upserting arrangement doc');
    return _upsertType(toUpload, types.ARRANGEMENT_TYPE, arrID);
  })
  .then(() => console.log('fetching existing relationships'))
  .then(() => searchRelationships('arrangement', arrID))
  .then(oldRelationships => manageRelationships(relationships, oldRelationships));
}

/** Handle flow of identifying relationships, upserting the adapted doc, and managing relationships */
const _upsertWithRelationships = (doc, adapter, type, relationshipField) => {
  const { id, toUpload, relationships } = adapter(doc);
  return _upsertType(toUpload, type, id)
    .then(() => searchRelationships(relationshipField, id))
    .then(oldRelationships => manageRelationships(relationships, oldRelationships));
}

/** Format the call to _upsert for the above doc types */
const _upsertType = (doc, type, _id) => _upsert(Object.assign({}, doc, { _id, type }));

/** Handle the upserting logic for cloudant */
const _upsert = (doc) => _sageDB.getAsync(doc._id)
  .then(returnedDoc =>
    _sageDB.insertAsync(
      Object.assign({}, doc, { _rev: returnedDoc._rev })
    )
  ).catch(e =>
    e.error === 'not_found' ? _sageDB.insertAsync(doc) : e
  );

/** Destroy docs! And their relationships! */
const destroyAlbum = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'album');
const destroyArrangement = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'arrangement');
const destroyArtist = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'artist');
const destroyConcert = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'concert');
const destroyHangover = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'hangover');
const destroySemester = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'semester');
const destroyTag = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'tag');
const destroyNonHangover = (_id, _rev) => _destroyWithRelationships(_id, _rev, 'nonHangover');

/** Destroy a doc and all of its relationships */
const _destroyWithRelationships = (id, rev, relationshipField) => searchRelationships(relationshipField, id)
  .then(relationships => !relationships.length ?
    _destroy(id, rev) :
    _sageDB.bulkAsync({
      docs: [...relationships, { _id: id, _rev: rev }].map(({ _id, _rev }) => ({ _id, _rev, _deleted: true })),
    })
  );

/** Destroy a doc */
const _destroy = (_id, _rev) => _sageDB.destroyAsync(_id, _rev);

/** Guarantee that the only relationships are the passed in array in as few deletes/adds as possible */
const manageRelationships = (relationships, oldRelationships) => {
  const oldRelationshipMap = {};
  for (const oldRelationship of oldRelationships) {
    oldRelationshipMap[oldRelationship._id] = oldRelationship;
  }
  const visitedMap = {};
  const relationshipsToUpload = [];
  for (const relationship of relationships) {
    if (oldRelationshipMap[relationship.id]) {
      visitedMap[relationship.id] = true;
    } else {
      relationshipsToUpload.push(relationship);
    }
  }
  const relationshipsToDelete = oldRelationships.filter(or => !visitedMap[or._id]);
  console.log('creating new relationships and deleting stale ones');
  return Promise.join(
    Promise.map(relationshipsToUpload, ({ doc, type, id }) => _upsertType(doc, type, id), OPTS),
    Promise.map(relationshipsToDelete, ({ _id, _rev }) => _destroy(_id, _rev), OPTS),
    () => {}
  );
}

// export time
module.exports = {
  // initializers
  initialize, addIndex, _upsert,
  // get full objects
  getFullArrangement,  getFullHangover, getFullSemester, getFullConcert, getFullAlbum, getFullArtist, getFullTag, getFullNonHangover,
  // async checkers
  arrangementExists, getArrangementFiles,
  // get list views
  getAlbumFormats, getArrangements, getArrangementTypes, getArtists, getConcertTypes, getGenres, getHangovers, getKeys, getSemesters, getTags, getAlbums, getConcerts,
  // search town
  searchArtists, searchArrangements, searchGenres, searchHangovers, searchRelationships, searchTags, searchNonHangovers,
  // upsert time
  upsertArrangementType, upsertAlbumFormat, upsertConcertType, upsertGenre, upsertKey, upsertAlbum, upsertArtist, upsertConcert, upsertHangover, upsertSemester, upsertTag, upsertNonHangover, upsertArrangement,
  // destroyers
  destroyAlbum, destroyArrangement, destroyArtist, destroyConcert, destroyHangover, destroySemester, destroyTag, destroyNonHangover,
};
