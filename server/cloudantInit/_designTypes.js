/* global emit */
/* eslint-disable prefer-arrow-callback */

const hangoverMapper = function (doc) {
  if (doc.type === 'hangover') {
    emit(doc._id, 1);
  }
};

const semesterMapper = function (doc) {
  if (doc.type === 'semester') {
    emit(doc._id, 1);
  }
};

const arrangementMapper = function (doc) {
  if (doc.type === 'arrangement') {
    emit(doc._id, 1);
  }
};

const albumMapper = function (doc) {
  if (doc.type === 'album') {
    emit(doc._id, 1);
  }
};

const concertMapper = function (doc) {
  if (doc.type === 'concert') {
    emit(doc._id, 1);
  }
};

const albumFormatMapper = function (doc) {
  if (doc.type === 'album_format') {
    emit(doc._id, 1);
  }
};

const arrangementTypeMapper = function (doc) {
  if (doc.type === 'arrangement_type') {
    emit(doc._id, 1);
  }
};

const concertTypeMapper = function (doc) {
  if (doc.type === 'concert_type') {
    emit(doc._id, 1);
  }
};

const genreMapper = function (doc) {
  if (doc.type === 'genre') {
    emit(doc._id, 1);
  }
};

const artistMapper = function (doc) {
  if (doc.type === 'artist') {
    emit(doc._id, 1);
  }
};

const keyMapper = function (doc) {
  if (doc.type === 'key') {
    emit(doc._id, 1);
  }
};

const tagMapper = function (doc) {
  if (doc.type === 'tag') {
    emit(doc._id, 1);
  }
};

const ddoc = {
  _id: '_design/types',
  language: 'javascript',
  views: {
    hangovers: { map: hangoverMapper },
    semesters: { map: semesterMapper },
    arrangements: { map: arrangementMapper },
    albums: { map: albumMapper },
    concerts: { map: concertMapper },
    album_formats: { map: albumFormatMapper },
    arrangement_types: { map: arrangementTypeMapper },
    concert_types: { map: concertTypeMapper },
    genres: { map: genreMapper },
    artists: { map: artistMapper },
    keys: { map: keyMapper },
    tags: { map: tagMapper },
  },
};

module.exports = ddoc;
