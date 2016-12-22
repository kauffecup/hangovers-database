/* global emit */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */

const albumMap = function (doc) {
  if (doc.type === 'album') {
    emit([doc._id]);
  } else if (doc.type === 'album_semester_relationship') {
    emit([doc.album, 'semester'], { _id: doc.semester });
  } else if (doc.type === 'arrangement_albums_relationship') {
    emit([doc.album, 'trackList'], { _id: doc.arrangement });
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
  } else if (doc.type === 'arrangement_albums_relationship') {
    emit([doc.arrangement, 'albums'], { _id: doc.album });
  } else if (doc.type === 'arrangement_arrangers_relationship') {
    emit([doc.arrangement, 'arrangers'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement_artist_relationship') {
    emit([doc.arrangement, 'artists'], { _id: doc.artist });
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
  } else if (doc.type === 'arrangement_tag_relationship') {
    emit([doc.arrangement, 'tags'], { _id: doc.tag });
  }
};

const artistMap = function (doc) {
  if (doc.type === 'artist') {
    emit([doc._id]);
  } else if (doc.type === 'arrangement') {
    if (doc.artists && doc.artists.length) {
      for (var i = 0; i < doc.artists.length; i++) {
        emit([doc.artists[i], 'arrangements'], { _id: doc._id });
      }
    }
  }
};

const concertMap = function (doc) {
  if (doc.type === 'concert') {
    emit([doc._id]);
    if (doc.concertType) {
      emit([doc._id, 'concertType'], { _id: doc.concertType });
    }
  } else if (doc.type === 'concert_semester_relationship') {
    emit([doc.concert, 'semester'], { _id: doc.semester });
  } else if (doc.type === 'md_concert_relationship') {
    emit([doc.concert, 'md'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement_concerts_relationship') {
    emit([doc.concert, 'setList'], { _id: doc.arrangement });
  }
};

const hangoverMap = function (doc) {
  if (doc.type === 'hangover') {
    emit([doc._id]);
  } else if (doc.type === 'hangover_graduation_semester_relationship') {
    emit([doc.hangover, 'graduationSemester'], { _id: doc.semester });
  } else if (doc.type === 'md_semester_relationship') {
    emit([doc.hangover, 'semestersMDed'], { _id: doc.semester });
  } else if (doc.type === 'president_semester_relationship') {
    emit([doc.hangover, 'semestersPresided'], { _id: doc.semester });
  } else if (doc.type === 'bm_semester_relationship') {
    emit([doc.hangover, 'semestersBMed'], { _id: doc.semester });
  } else if (doc.type === 'md_concert_relationship') {
    emit([doc.hangover, 'concertsMDed'], { _id: doc.concert });
  } else if (doc.type === 'arrangement_arrangers_relationship') {
    emit([doc.hangover, 'arranged'], { _id: doc.arrangement });
  } else if (doc.type === 'arrangement_soloists_relationship') {
    emit([doc.hangover, 'soloed'], { _id: doc.arrangement });
  }
};

const semesterMap = function (doc) {
  if (doc.type === 'semester') {
    emit([doc._id]);
  } else if (doc.type === 'md_semester_relationship') {
    emit([doc.semester, 'md'], { _id: doc.hangover });
  } else if (doc.type === 'president_semester_relationship') {
    emit([doc.semester, 'president'], { _id: doc.hangover });
  } else if (doc.type === 'bm_semester_relationship') {
    emit([doc.semester, 'bm'], { _id: doc.hangover });
  } else if (doc.type === 'arrangement_semester_arranged_relationship') {
    emit([doc.semester, 'arrangements'], { _id: doc.arrangement });
  } else if (doc.type === 'arrangement_semesters_performed_relationship') {
    emit([doc.semester, 'performed'], { _id: doc.arrangement });
  } else if (doc.type === 'album_semester_relationship') {
    emit([doc.semester, 'albums'], { _id: doc.album });
  } else if (doc.type === 'concert_semester_relationship') {
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
