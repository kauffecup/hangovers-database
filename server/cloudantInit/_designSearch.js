/* global index */

const hangoverIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'hangover') {
    if (typeof doc.firstName === 'string') {
      index('firstName', doc.firstName.toLowerCase());
    }
    if (typeof doc.lastName === 'string') {
      index('lastName', doc.lastName.toLowerCase());
    }
    if (typeof doc.graduationSemester === 'string') {
      index('graduationSemester', doc.graduationSemester.toLowerCase());
    }
    if (typeof doc.firstName === 'string' && typeof doc.lastName === 'string') {
      index('nameString', ('' + doc.firstName + ' ' + doc.lastName).toLowerCase()); // eslint-disable-line
    }
  }
};

const artistIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'artist') {
    if (typeof doc.name === 'string') {
      index('name', doc.name.toLowerCase());
    }
  }
};

const genreIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'genre') {
    if (typeof doc.name === 'string') {
      index('name', doc.name.toLowerCase());
    }
  }
};

const tagIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'tag') {
    if (typeof doc.name === 'string') {
      index('name', doc.name.toLowerCase());
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
    genres: {
      analyzer: 'standard',
      index: genreIndexer,
    },
    tags: {
      analyzer: 'standard',
      index: tagIndexer,
    },
  },
};

module.exports = ddoc;
