const Promise = require('bluebird');
const cloudant = require('cloudant');

// top level objects
const ARRANGEMENT_TYPE = 'arrangement';
const HANGOVER_TYPE = 'hangover';
const SEMESTER_TYPE = 'semester';
const ALBUM_TYPE = 'album';
const CONCERT_TYPE = 'concert';
// essentially enums
const TYPE_TYPE = 'arrangement_type';
const QUALITY_TYPE = 'quality';

const getArrangementID = arrangement =>
  `${ARRANGEMENT_TYPE}_${arrangement.name.toLowerCase().replace(' ', '_')}`;

const getArrangementTypeID = arrangementType =>
  `${TYPE_TYPE}_${arrangementType.name.toLowerCase().replace(' ', '_')}`;

const getHangoverID = hangover =>
  `${HANGOVER_TYPE}_${hangover.lastName.toLowerCase().replace(' ', '_')}_${hangover.firstName.toLowerCase().replace('.', '').replace(' ', '_')}`;

const getSemesterID = semester =>
  `${SEMESTER_TYPE}_${semester.year}_${semester.type.toLowerCase()}`;

const getAlbumID = album =>
  `${ALBUM_TYPE}_${album.name.toLowerCase().replace(' ', '_')}`;

const getQualityID = quality =>
  `${QUALITY_TYPE}_${quality.name.toLowerCase().replace(' ', '_')}`;

const getConcertID = concert =>
  `${CONCERT_TYPE}_${concert.name.toLowerCase().replace(' ', '_')}`;

module.exports = class SageDB {
  constructor(config, init) {
    if (!init) {
      const c = cloudant({ account: config.username, password: config.password });
      this._sageDB = Promise.promisifyAll(c.use('sage'));
    }
  }

  initialize(config) {
    return new Promise((resolve, reject) => {
      const c = cloudant({ account: config.username, password: config.password });
      c.db.create('sage', (e) => {
        if (!e || (e && e.error === 'file_exists')) {
          this._lifecycleDB = Promise.promisifyAll(c.use('sage'));
          resolve();
        } else {
          console.error(e);
          reject(e);
        }
      });
    });
  }

  upsertArrangement(arrangement) {
    return this._upsert(arrangement, ARRANGEMENT_TYPE, getArrangementID(arrangement));
  }

  upsertArrangementType(arrangementType) {
    return this._upsert(arrangementType, TYPE_TYPE, getArrangementTypeID(arrangementType));
  }

  upsertHangover(hangover) {
    return this._upsert(hangover, HANGOVER_TYPE, getHangoverID(hangover));
  }

  upsertSemester(semester) {
    return this._upsert(semester, SEMESTER_TYPE, getSemesterID(semester));
  }

  upsertAlbum(album) {
    return this._upsert(album, ALBUM_TYPE, getAlbumID(album));
  }

  upsertQuality(quality) {
    return this._upsert(quality, QUALITY_TYPE, getQualityID(quality));
  }

  upsertConcert(concert) {
    return this._upsert(concert, CONCERT_TYPE, getConcertID(concert));
  }

  _upsert(doc, type, _id) {
    const newDoc = Object.assign({}, doc, { _id, type });
    return this._sageDB.getAsync(_id)
      .then(returnedDoc =>
        this._sageDB.insertAsync(Object.assign({}, newDoc, { _rev: returnedDoc._rev }))
      ).catch(e =>
        e.error === 'not_found' ? this._sageDB.insertAsync(newDoc) : e
      );
  }
};
