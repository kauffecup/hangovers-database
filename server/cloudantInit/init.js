const Promise = require('bluebird');
const SageDB = require('../SageDB');
const config = require('../../config/cloudant.json');
const semesters = require('./semesters.json');
const hangovers = require('./hangovers.json');
const arrangementTypes = require('./arrangementTypes.json');
const albums = require('./albums.json');
const albumFormats = require('./albumFormats.json');
const concertTypes = require('./concertTypes.json');
const concerts = require('./concerts.json');
const genres = require('./genres.json');
const keys = require('./keys.json');
const designFull = require('./_designFull');
const designTypes = require('./_designTypes');
const designRelationships = require('./_designRelationships');
const designSearch = require('./_designSearch');
const albumSemesters = require('./relationships/albumSemesters.json');
const bms = require('./relationships/BMs.json');
const concertSemesters = require('./relationships/concertSemesters.json');
const mds = require('./relationships/MDs.json');
const pres = require('./relationships/Presidents.json');
const grad = require('./relationships/hangoversGraduated.json');
const concertMDs = require('./relationships/concertMDs.json');

const sageDB = new SageDB(config);

// limit the number of promises we have out at a given time. helpful when
// writing hundreds of documents to the database
const CONCURRENCY = 3;
const opts = { concurrency: CONCURRENCY };

// first we add our design docs
sageDB.initialize(config)
  .then(() => sageDB._upsert(designFull))
  .then(() => sageDB._upsert(designTypes))
  .then(() => sageDB._upsert(designRelationships))
  .then(() => sageDB._upsert(designSearch))
  // some semesters
  .then(() => Promise.map(semesters, s => sageDB.upsertSemester(s), opts))
  // next the types
  .then(() => Promise.map(arrangementTypes, at => sageDB.upsertArrangementType(at), opts))
  // next the hangovers
  .then(() => Promise.map(hangovers, h => sageDB.upsertHangover(h), opts))
  // next the albums
  .then(() => Promise.map(albums, a => sageDB.upsertAlbum(a), opts))
  // ...and the album formats
  .then(() => Promise.map(albumFormats, af => sageDB.upsertAlbumFormat(af), opts))
  // the concert types
  .then(() => Promise.map(concertTypes, ct => sageDB.upsertConcertType(ct), opts))
  // some concerts
  .then(() => Promise.map(concerts, c => sageDB.upsertConcert(c), opts))
  // and the keys of course!
  .then(() => Promise.map(keys, k => sageDB.upsertKey(k), opts))
  // lastly, genres.
  .then(() => Promise.map(genres, g => sageDB.upsertGenre(g), opts))
  // finally, the relationships. their ids are already defined so can do them all at once
  .then(() => Promise.map([
    ...bms, ...mds, ...pres, ...grad, ...concertMDs, ...albumSemesters, ...concertSemesters,
  ], doc => sageDB._upsert(doc), opts));
