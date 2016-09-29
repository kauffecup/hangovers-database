const Promise = require('bluebird');
const cloudant = require('cloudant');

const initialize = config => new Promise((resolve, reject) => {
  const c = cloudant({ account: config.username, password: config.password });
  c.db.create('arrangements', (err) => {
    if (!err || (err && err.error === 'file_exists')) {
      resolve(Promise.promisifyAll(c.use('arrangements')));
    } else {
      reject(err);
    }
  });
});

const getID = arrangement =>
`${arrangement.name.toLowerCase()}`;

const addOrUpdateArrangement = arrangementsDB => (arrangement) => {
  const _id = getID(arrangement);
  const newArrangement = Object.assign({}, arrangement, { _id });
  return arrangementsDB.getAsync(_id)
    .then(arr =>
      arrangementsDB.insertAsync(Object.assign({}, newArrangement, { _rev: arr._rev }))
    ).catch(e =>
      e.error === 'not_found' ? arrangementsDB.insertAsync(newArrangement) : e
    );
};

module.exports = {
  initialize,
  addOrUpdateArrangement,
};
