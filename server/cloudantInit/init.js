const SageDB = require('../SageDB');
const config = require('../../config/cloudant.json');
const hangovers = require('./hangovers.json');
const arrangementTypes = require('./arrangementTypes.json');
const qualities = require('./qualities.json');

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
});
