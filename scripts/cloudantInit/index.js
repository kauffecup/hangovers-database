// configure environment variables first
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../config/.env') });

// module imports
const Promise = require('bluebird');
const sageDB = require('../../server/modules/sageDB');
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
const designUsers = require('./_designUsers');
const albumSemesters = require('./relationships/albumSemesters.json');
const bms = require('./relationships/BMs.json');
const concertSemesters = require('./relationships/concertSemesters.json');
const mds = require('./relationships/MDs.json');
const pres = require('./relationships/Presidents.json');
const grad = require('./relationships/hangoversGraduated.json');
const concertMDs = require('./relationships/concertMDs.json');

// limit the number of promises we have out at a given time. helpful when
// writing hundreds of documents to the database
const CONCURRENCY = 1;
const opts = { concurrency: CONCURRENCY };

// prevent from running on production db
if (process.env.CLOUDANT_USERNAME === 'sage') {
  console.log('dont run on production!');
  process.exit(0);
}

// first we add our design docs
sageDB.initialize()
  .then(() => console.log('inserting/updating design documents'))
  .then(() => sageDB._upsert(designFull))
  .then(() => sageDB._upsert(designTypes))
  .then(() => sageDB._upsert(designRelationships))
  .then(() => sageDB._upsert(designSearch))
  .then(() => sageDB._upsert(designUsers))
  // some semesters
  .then(() => console.log('inserting/updating semesters'))
  .then(() => Promise.map(semesters, s => sageDB.upsertSemester(s), opts))
  // next the types
  .then(() => console.log('inserting/updating arrangement types'))
  .then(() => Promise.map(arrangementTypes, at => sageDB.upsertArrangementType(at), opts))
  // next the hangovers
  .then(() => console.log('inserting/updating hangovers'))
  .then(() => Promise.map(hangovers, h => sageDB.upsertHangover(h), opts))
  // next the albums
  .then(() => console.log('inserting/updating albums'))
  .then(() => Promise.map(albums, a => sageDB.upsertAlbum(a), opts))
  // ...and the album formats
  .then(() => console.log('inserting/updating album formats'))
  .then(() => Promise.map(albumFormats, af => sageDB.upsertAlbumFormat(af), opts))
  // the concert types
  .then(() => console.log('inserting/updating concert types'))
  .then(() => Promise.map(concertTypes, ct => sageDB.upsertConcertType(ct), opts))
  // some concerts
  .then(() => console.log('inserting/updating concerts'))
  .then(() => Promise.map(concerts, c => sageDB.upsertConcert(c), opts))
  // and the keys of course!
  .then(() => console.log('inserting/updating keys'))
  .then(() => Promise.map(keys, k => sageDB.upsertKey(k), opts))
  // almost lastly, genres.
  .then(() => console.log('inserting/updating genres'))
  .then(() => Promise.map(genres, g => sageDB.upsertGenre(g), opts))
  // finally, the relationships. their ids are already defined so can do them all at once
  .then(() => console.log('inserting/updating lots of relationshps'))
  .then(() => Promise.map([
    ...bms, ...mds, ...pres, ...grad, ...concertMDs, ...albumSemesters, ...concertSemesters,
  ], doc => sageDB._upsert(doc), opts));
