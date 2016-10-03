const SageDB = require('../SageDB');
const config = require('../../config/cloudant.json');
const hangovers = require('./hangovers.json');
const arrangementTypes = require('./arrangementTypes.json');
const qualities = require('./qualities.json');
const albums = require('./albums.json');
const albumFormats = require('./albumFormats.json');
const concertTypes = require('./concertTypes.json');
const concerts = require('./concerts.json');

const sageDB = new SageDB(config);

sageDB.initialize(config).then(() => {
  // first we add all the semesters
  for (let year = 1964; year <= 2020; year++) {
    sageDB.upsertSemester({ year, type: 'fall' });
    sageDB.upsertSemester({ year, type: 'spring' });
  }

  // next the types
  arrangementTypes.forEach(at =>
    sageDB.upsertArrangementType(at)
      .catch((e) => {
        console.log('arrangement type', at);
        console.error(e);
      })
  );

  // next the qualities
  qualities.forEach(q =>
    sageDB.upsertQuality(q)
      .catch((e) => {
        console.log('quality', q);
        console.error(e);
      })
  );

  // next the hangovers
  hangovers.forEach(h =>
    sageDB.upsertHangover(h)
      .catch((e) => {
        console.log('hangover', h);
        console.error(e);
      })
  );

  // next the albums
  albums.forEach(a =>
    sageDB.upsertAlbum(a)
      .catch((e) => {
        console.log('album', a);
        console.error(e);
      })
  );

  // ...and the album formats
  albumFormats.forEach(af =>
    sageDB.upsertAlbumFormat(af)
      .catch((e) => {
        console.log('album format', af);
        console.error(e);
      })
  );

  // the concert types
  concertTypes.forEach(ct =>
    sageDB.upsertConcertType(ct)
      .catch((e) => {
        console.log('concert type', ct);
        console.error(e);
      })
  );

  // lastly some concerts
  concerts.forEach(c =>
    sageDB.upsertConcert(c)
      .catch((e) => {
        console.log('concert', c);
        console.error(e);
      })
  );
});
