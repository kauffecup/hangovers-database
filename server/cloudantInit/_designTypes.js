/* global emit */
/* eslint-disable prefer-arrow-callback */

const albumMapper = function (doc) {
  if (doc.type === 'album') {
    emit(doc._id, 1);
  } else if (doc.type === 'album_semester_relationship') {
    emit([doc.album, 'semester'], { _id: doc.semester });
  }
};

const albumFormatMapper = function (doc) {
  if (doc.type === 'album_format') {
    emit(doc._id, 1);
  }
};

const arrangementMapper = function (doc) {
  if (doc.type === 'arrangement') {
    emit(doc._id, 1);
  }
};

const arrangementTypeMapper = function (doc) {
  if (doc.type === 'arrangement_type') {
    emit(doc._id, 1);
  }
};

const artistMapper = function (doc) {
  if (doc.type === 'artist') {
    emit(doc._id, 1);
  }
};

const concertMapper = function (doc) {
  if (doc.type === 'concert') {
    emit(doc._id, 1);
  } else if (doc.type === 'concert_semester_relationship') {
    emit([doc.concert, 'semester'], { _id: doc.semester });
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

const hangoverMapper = function (doc) {
  if (doc.type === 'hangover') {
    emit(doc._id, 1);
  }
};

const keyMapper = function (doc) {
  if (doc.type === 'key') {
    emit(doc._id, 1);
  }
};

const semesterMapper = function (doc) {
  if (doc.type === 'semester') {
    emit(doc._id, 1);
  }
};

const tagMapper = function (doc) {
  if (doc.type === 'tag') {
    emit(doc._id, 1);
  }
};

const nonHangoverMapper = function (doc) {
  if (doc.type === 'non_hangover') {
    emit(doc._id, 1);
  }
};

const ddoc = {
  _id: '_design/types',
  language: 'javascript',
  views: {
    albums: { map: albumMapper },
    album_formats: { map: albumFormatMapper },
    arrangements: { map: arrangementMapper },
    arrangement_types: { map: arrangementTypeMapper },
    artists: { map: artistMapper },
    concerts: { map: concertMapper },
    concert_types: { map: concertTypeMapper },
    genres: { map: genreMapper },
    keys: { map: keyMapper },
    hangovers: { map: hangoverMapper },
    semesters: { map: semesterMapper },
    tags: { map: tagMapper },
    non_hangovers: { map: nonHangoverMapper },
  },
};

module.exports = ddoc;
