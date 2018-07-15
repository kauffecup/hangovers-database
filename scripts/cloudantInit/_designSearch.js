/* global index */
/* eslint-disable no-var */
/* eslint-disable prefer-template */

const hangoverIndexer = function (doc) {
  var name = '';
  if (typeof doc.type === 'string' && doc.type === 'hangover') {
    if (typeof doc.firstName === 'string') {
      index('firstName', doc.firstName.toLowerCase());
      name += doc.firstName;
    }
    if (typeof doc.hangsName === 'string') {
      index('hangsName', doc.hangsName.toLowerCase());
      name += ' ' + doc.hangsName;
    }
    if (typeof doc.lastName === 'string') {
      index('lastName', doc.lastName.toLowerCase());
      name += ' ' + doc.lastName;
    }
    if (name) {
      index('nameString', name.toLowerCase());
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

const arrangementIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'arrangement') {
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

const nonHangoverIndexer = function (doc) {
  if (typeof doc.type === 'string' && doc.type === 'non_hangover') {
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
    doc.type === 'arrangement_non_hangover_arrangers_relationship' ||
    doc.type === 'arrangement_artist_relationship' ||
    doc.type === 'arrangement_concerts_relationship' ||
    doc.type === 'arrangement_genre_relationship' ||
    doc.type === 'arrangement_semester_arranged_relationship' ||
    doc.type === 'arrangement_semesters_performed_relationship' ||
    doc.type === 'arrangement_soloists_relationship' ||
    doc.type === 'arrangement_tag_relationship' ||
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
    if (typeof doc.artist === 'string') {
      index('artist', doc.artist);
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
    if (typeof doc.nonHangover === 'string') {
      index('nonHangover', doc.nonHangover);
    }
    if (typeof doc.semester === 'string') {
      index('semester', doc.semester);
    }
    if (typeof doc.tag === 'string') {
      index('tag', doc.tag);
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
    non_hangovers: {
      analyzer: 'standard',
      index: nonHangoverIndexer,
    },
    artists: {
      analyzer: 'standard',
      index: artistIndexer,
    },
    arrangements: {
      analyzer: 'standard',
      index: arrangementIndexer,
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
