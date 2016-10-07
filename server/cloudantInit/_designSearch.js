/* global index */

const hangoverIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'hangover') {
    if (typeof doc.firstName === 'string') {
      index('firstName', doc.firstName);
    }
    if (typeof doc.lastName === 'string') {
      index('lastName', doc.lastName);
    }
    if (typeof doc.graduationSemester === 'string') {
      index('graduationSemester', doc.graduationSemester);
    }
    if (typeof doc.firstName === 'string' && typeof doc.lastName === 'string') {
      index('nameString', '' + doc.firstName + ' ' + doc.lastName); // eslint-disable-line
    }
  }
};

const artistIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'artist') {
    if (typeof doc.name === 'string') {
      index('name', doc.name);
    }
  }
};

const ddoc = {
  _id: '_design/search',
  indexes: {
    hangovers: {
      analyzer: 'standard',
      index: hangoverIndexer,
    },
    artists: {
      analyzer: 'standard',
      index: artistIndexer,
    },
  },
};

module.exports = ddoc;
