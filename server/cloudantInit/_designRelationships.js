/* global emit */
/* eslint-disable prefer-arrow-callback */

const albumSemesterMapper = function (doc) {
  if (doc.type === 'album_semester_relationship_type') {
    emit(doc._id, 1);
  }
};

const BMSemesterMapper = function (doc) {
  if (doc.type === 'bm_semester_relationship_type') {
    emit(doc._id, 1);
  }
};

const concertSemesterMapper = function (doc) {
  if (doc.type === 'md_concert_relationship_type') {
    emit(doc._id, 1);
  }
};

const hangoverGraduationSemesterMapper = function (doc) {
  if (doc.type === 'hangover_graduation_semester_relationship') {
    emit(doc._id, 1);
  }
};

const MDConcertMapper = function (doc) {
  if (doc.type === 'md_concert_relationship_type') {
    emit(doc._id, 1);
  }
};

const MDSemesterMapper = function (doc) {
  if (doc.type === 'md_semester_relationship_type') {
    emit(doc._id, 1);
  }
};

const PresidentSemesterMapper = function (doc) {
  if (doc.type === 'president_semester_relationship_type') {
    emit(doc._id, 1);
  }
};

const ddoc = {
  _id: '_design/relationships',
  language: 'javascript',
  views: {
    album_semester: {
      map: albumSemesterMapper,
    },
    bm_semester: {
      map: BMSemesterMapper,
    },
    concert_semester: {
      map: concertSemesterMapper,
    },
    hangover_graduation_semester: {
      map: hangoverGraduationSemesterMapper,
    },
    md_concert: {
      map: MDConcertMapper,
    },
    md_semester: {
      map: MDSemesterMapper,
    },
    president_semester: {
      map: PresidentSemesterMapper,
    },
  },
};

module.exports = ddoc;
