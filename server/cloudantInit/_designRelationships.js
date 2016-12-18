/* global emit */
/* eslint-disable prefer-arrow-callback */

const albumSemesterMapper = function (doc) {
  if (doc.type === 'album_semester_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementAlbumsMapper = function (doc) {
  if (doc.type === 'arrangement_albums_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementArrangerMapper = function (doc) {
  if (doc.type === 'arrangement_arrangers_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementConcertMapper = function (doc) {
  if (doc.type === 'arrangement_concerts_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementGenreMapper = function (doc) {
  if (doc.type === 'arrangement_genre_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementSemesterArrangedMapper = function (doc) {
  if (doc.type === 'arrangement_semester_arranged_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementSemesterPerformedMapper = function (doc) {
  if (doc.type === 'arrangement_semesters_performed_relationship') {
    emit(doc._id, 1);
  }
};

const arrangementSolistMapper = function (doc) {
  if (doc.type === 'arrangement_soloists_relationship') {
    emit(doc._id, 1);
  }
};

const BMSemesterMapper = function (doc) {
  if (doc.type === 'bm_semester_relationship') {
    emit(doc._id, 1);
  }
};

const concertSemesterMapper = function (doc) {
  if (doc.type === 'md_concert_relationship') {
    emit(doc._id, 1);
  }
};

const hangoverGraduationSemesterMapper = function (doc) {
  if (doc.type === 'hangover_graduation_semester_relationship') {
    emit(doc._id, 1);
  }
};

const MDConcertMapper = function (doc) {
  if (doc.type === 'md_concert_relationship') {
    emit(doc._id, 1);
  }
};

const MDSemesterMapper = function (doc) {
  if (doc.type === 'md_semester_relationship') {
    emit(doc._id, 1);
  }
};

const PresidentSemesterMapper = function (doc) {
  if (doc.type === 'president_semester_relationship') {
    emit(doc._id, 1);
  }
};

const ddoc = {
  _id: '_design/relationships',
  language: 'javascript',
  views: {
    album_semester: { map: albumSemesterMapper },
    arrangement_album: { map: arrangementAlbumsMapper },
    arrangement_arranger: { map: arrangementArrangerMapper },
    arrangement_concert: { map: arrangementConcertMapper },
    arrangement_genre: { map: arrangementGenreMapper },
    arrangement_semester_arranged: { map: arrangementSemesterArrangedMapper },
    arrangement_semester_performed: { map: arrangementSemesterPerformedMapper },
    arrangement_soloist: { map: arrangementSolistMapper },
    bm_semester: { map: BMSemesterMapper },
    concert_semester: { map: concertSemesterMapper },
    hangover_graduation_semester: { map: hangoverGraduationSemesterMapper },
    md_concert: { map: MDConcertMapper },
    md_semester: { map: MDSemesterMapper },
    president_semester: { map: PresidentSemesterMapper },
  },
};

module.exports = ddoc;
