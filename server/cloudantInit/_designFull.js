/* global emit */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */

const albumMap = function (doc) {
  if (doc.type === 'album') {
    emit([doc._id]);
  } else if (doc.type === 'album_semester_relationship_type') {
    emit([doc.album, 'semester'], { _id: doc.semester });
  } else if (doc.type === 'arrangement') {
    if (doc.albums && doc.albums.length) {
      for (var i = 0; i < doc.concerts.length; i++) {
        emit([doc.albums[i], 'trackList'], { _id: doc._id });
      }
    }
  }
};

const arrangementMap = function (doc) {
  if (doc.type === 'arrangement') {
    emit([doc._id]);

    var singleFields = ['arrangementType', 'key'];
    singleFields.forEach(function (field) {
      if (typeof doc[field] === 'string') {
        emit([doc._id, field], { _id: doc[field] });
      }
    });

    var multiFields = ['originalArtists', 'tags'];
    multiFields.forEach(function (field) {
      if (doc[field] && doc[field].length) {
        for (var i = 0; i < doc[field].length; i++) {
          emit([doc._id, field], { _id: doc[field][i] });
        }
      }
    });
  } else if (doc.type === 'arrangement_albums_relationship') {
    emit([doc.arrangement, 'albums'], { _id: doc.album });
  } else if (doc.type === 'arrangement_arrangers_relationship') {
    emit([doc.arrangement, 'arrangers'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement_concerts_relationship') {
    emit([doc.arrangement, 'concerts'], { _id: doc.concert });
  } else if (doc.type === 'arrangement_genre_relationship') {
    emit([doc.arrangement, 'genre'], { _id: doc.genre });
  } else if (doc.type === 'arrangement_semester_arranged_relationship') {
    emit([doc.arrangement, 'semesterArranged'], { _id: doc.semester });
  } else if (doc.type === 'arrangement_semesters_performed_relationship') {
    emit([doc.arrangement, 'semestersPerformed'], { _id: doc.semester });
  } else if (doc.type === 'arrangement_soloists_relationship') {
    emit([doc.arrangement, 'soloists'], { _id: doc.hangover });
  }
};

const artistMap = function (doc) {
  if (doc.type === 'artist') {
    emit([doc._id]);
  } else if (doc.type === 'arrangement') {
    if (doc.originalArtists && doc.originalArtists.length) {
      for (var i = 0; i < doc.originalArtists.length; i++) {
        emit([doc.originalArtists[i], 'arrangements'], { _id: doc._id });
      }
    }
  }
};

const concertMap = function (doc) {
  if (doc.type === 'concert') {
    emit([doc._id]);
  } else if (doc.type === 'concert_semester_relationship_type') {
    emit([doc.concert, 'semester'], { _id: doc.semester });
  } else if (doc.type === 'md_concert_relationship_type') {
    emit([doc.concert, 'md'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement') {
    if (doc.concerts && doc.concerts.length) {
      for (var i = 0; i < doc.concerts.length; i++) {
        emit([doc.concerts[i], 'setList'], { _id: doc._id });
      }
    }
  }
};

const hangoverMap = function (doc) {
  if (doc.type === 'hangover') {
    emit([doc._id]);
  } else if (doc.type === 'hangover_graduation_semester_relationship') {
    emit([doc.hangover, 'graduationSemester'], { _id: doc.semester });
  } else if (doc.type === 'md_semester_relationship_type') {
    emit([doc.hangover, 'semestersMDed'], { _id: doc.semester });
  } else if (doc.type === 'president_semester_relationship_type') {
    emit([doc.hangover, 'semestersPresided'], { _id: doc.semester });
  } else if (doc.type === 'bm_semester_relationship_type') {
    emit([doc.hangover, 'semestersBMed'], { _id: doc.semester });
  } else if (doc.type === 'md_concert_relationship_type') {
    emit([doc.hangover, 'concertsMDed'], { _id: doc.concert });
  } else if (doc.type === 'arrangement') {
    var multiFields = ['arrangers', 'soloists'];
    multiFields.forEach(function (field) {
      if (doc[field] && doc[field].length) {
        for (var i = 0; i < doc[field].length; i++) {
          emit([doc[field][i], field], { _id: doc._id });
        }
      }
    });
  }
};

const semesterMap = function (doc) {
  if (doc.type === 'semester') {
    emit([doc._id]);
  } else if (doc.type === 'md_semester_relationship_type') {
    emit([doc.semester, 'md'], { _id: doc.hangover });
  } else if (doc.type === 'president_semester_relationship_type') {
    emit([doc.semester, 'president'], { _id: doc.hangover });
  } else if (doc.type === 'bm_semester_relationship_type') {
    emit([doc.semester, 'bm'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement') {
    var singleFields = ['semesterArranged'];
    singleFields.forEach(function (field) {
      if (doc[field]) {
        emit([doc[field], field], { _id: doc._id });
      }
    });

    var multiFields = ['semestersPerformed'];
    multiFields.forEach(function (field) {
      if (doc[field] && doc[field].length) {
        for (var i = 0; i < doc[field].length; i++) {
          emit([doc[field][i], field], { _id: doc._id });
        }
      }
    });
  } else if (doc.type === 'album_semester_relationship_type') {
    emit([doc.semester, 'albums'], { _id: doc.album });
  } else if (doc.type === 'concert_semester_relationship_type') {
    emit([doc.semester, 'concerts'], { _id: doc.concert });
  } else if (doc.type === 'hangover_graduation_semester_relationship') {
    emit([doc.semester, 'graduatingHangs'], { _id: doc.hangover });
  }
};

const ddoc = {
  _id: '_design/full',
  language: 'javascript',
  views: {
    album: { map: albumMap },
    arrangement: { map: arrangementMap },
    artist: { map: artistMap },
    concert: { map: concertMap },
    hangover: { map: hangoverMap },
    semester: { map: semesterMap },
  },
};

module.exports = ddoc;
