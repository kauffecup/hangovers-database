const Promise = require('bluebird');
const SageDB = require('../SageDB');
const config = require('../../config/cloudant.json');
const hangovers = require('./hangovers.json');
const arrangementTypes = require('./arrangementTypes.json');
const qualities = require('./qualities.json');
const albums = require('./albums.json');
const albumFormats = require('./albumFormats.json');
const concertTypes = require('./concertTypes.json');
const concerts = require('./concerts.json');
const designTypes = require('./_designTypes.json');

const sageDB = new SageDB(config);

// limit the number of promises we have out at a given time. helpful when
// writing hundreds of documents to the database
const CONCURRENCY = 3;

sageDB.initialize(config).then(() =>
  // first we add our design doc
  sageDB._upsert(designTypes)
).then(() => {
  // then all the semesters
  const semesterArray = [];
  for (let year = 1964; year <= 2020; year++) {
    semesterArray.push({ year, type: 'fall' });
    semesterArray.push({ year, type: 'spring' });
  }
  return Promise.map(
    semesterArray,
    semester => sageDB.upsertSemester(semester),
    { concurrency: CONCURRENCY }
  );
}).then(() => Promise.map(
  // next the types
  arrangementTypes,
  at => sageDB.upsertArrangementType(at),
  { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // next the qualities
  qualities,
  q => sageDB.upsertQuality(q),
  { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // next the hangovers
    hangovers,
    h => sageDB.upsertHangover(h),
    { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // next the albums
  albums,
  a => sageDB.upsertAlbum(a),
  { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // ...and the album formats
  albumFormats,
  af => sageDB.upsertAlbumFormat(af),
  { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // the concert types
  concertTypes,
  ct => sageDB.upsertConcertType(ct),
  { concurrency: CONCURRENCY }
))
.then(() => Promise.map(
  // lastly some concerts
  concerts,
  c => sageDB.upsertConcert(c),
  { concurrency: CONCURRENCY }
));
