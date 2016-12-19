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


const relationshipIndexer = function (doc) {
  if (typeof doc.type === 'string' && (
    doc.type === 'album_semester_relationship' ||
    doc.type === 'arrangement_albums_relationship' ||
    doc.type === 'arrangement_arrangers_relationship' ||
    doc.type === 'arrangement_concerts_relationship' ||
    doc.type === 'arrangement_genre_relationship' ||
    doc.type === 'arrangement_semester_arranged_relationship' ||
    doc.type === 'arrangement_semesters_performed_relationship' ||
    doc.type === 'arrangement_soloists_relationship' ||
    doc.type === 'bm_semester_relationship' ||
    doc.type === 'concert_semester_relationship' ||
    doc.type === 'hangover_graduation_semester_relationship' ||
    doc.type === 'md_concert_relationship' ||
    doc.type === 'md_semester_relationship' ||
    doc.type === 'president_semester_relationship'
  )) {
    if (typeof doc.album === 'string') {
      index('album', doc.album);
    }
    if (typeof doc.arrangement === 'string') {
      index('arrangement', doc.arrangement);
    }
    if (typeof doc.concert === 'string') {
      index('concert', doc.concert);
    }
    if (typeof doc.genre === 'string') {
      index('genre', doc.genre);
    }
    if (typeof doc.hangover === 'string') {
      index('hangover', doc.hangover);
    }
    if (typeof doc.semester === 'string') {
      index('semester', doc.semester);
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
    relationships: {
      analyzer: 'standard',
      index: relationshipIndexer,
    },
    tags: {
      analyzer: 'standard',
      index: tagIndexer,
    },
  },
};

module.exports = ddoc;
