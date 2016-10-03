const Promise = require('bluebird');
const cloudant = require('cloudant');

// top level objects
const ARRANGEMENT_TYPE = 'arrangement';
const HANGOVER_TYPE = 'hangover';
const SEMESTER_TYPE = 'semester';
const ALBUM_TYPE = 'album';
const CONCERT_TYPE = 'concert';
// essentially enums
const ARRANGEMENT_TYPE_TYPE = 'arrangement_type';
const QUALITY_TYPE = 'quality';
const ALBUM_FORMAT_TYPE = 'album_format';
const CONCERT_TYPE_TYPE = 'concert_type';

const getArrangementID = arrangement =>
  `${ARRANGEMENT_TYPE}_${arrangement.name.toLowerCase().replace(/\s/g, '_')}`;

const getArrangementTypeID = arrangementType =>
  `${ARRANGEMENT_TYPE_TYPE}_${arrangementType.name.toLowerCase().replace(/\s/g, '_')}`;

const getHangoverID = hangover =>
  `${HANGOVER_TYPE}_${hangover.lastName.toLowerCase().replace(/\s/g, '_')}_${hangover.firstName.toLowerCase().replace('.', '').replace(/\s/g, '_')}`;

const getSemesterID = semester =>
  `${SEMESTER_TYPE}_${semester.year}_${semester.type.toLowerCase()}`;

const getAlbumID = album =>
  `${ALBUM_TYPE}_${album.name.toLowerCase().replace(/\s/g, '_')}`;

const getAlbumFormatID = albumFormat =>
  `${ALBUM_FORMAT_TYPE}_${albumFormat.name.toLowerCase().replace(/\s/g, '_')}`;

const getQualityID = quality =>
  `${QUALITY_TYPE}_${quality.name.toLowerCase().replace(/\s/g, '_')}`;

const getConcertID = concert =>
  `${CONCERT_TYPE}_${concert.name.toLowerCase().replace(/\s/g, '_')}`;

const getConcertTypeID = concertType =>
  `${CONCERT_TYPE_TYPE}_${concertType.name.toLowerCase().replace(/\s/g, '_')}`;

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
    return this._upsertType(arrangement, ARRANGEMENT_TYPE, getArrangementID(arrangement));
  }

  upsertArrangementType(arrangementType) {
    return this._upsertType(arrangementType, ARRANGEMENT_TYPE_TYPE, getArrangementTypeID(arrangementType));
  }

  upsertHangover(hangover) {
    return this._upsertType(hangover, HANGOVER_TYPE, getHangoverID(hangover));
  }

  upsertSemester(semester) {
    return this._upsertType(semester, SEMESTER_TYPE, getSemesterID(semester));
  }

  upsertAlbum(album) {
    return this._upsertType(album, ALBUM_TYPE, getAlbumID(album));
  }

  upsertAlbumFormat(albumFormat) {
    return this._upsertType(albumFormat, ALBUM_FORMAT_TYPE, getAlbumFormatID(albumFormat));
  }

  upsertQuality(quality) {
    return this._upsertType(quality, QUALITY_TYPE, getQualityID(quality));
  }

  upsertConcert(concert) {
    return this._upsertType(concert, CONCERT_TYPE, getConcertID(concert));
  }

  upsertConcertType(concertType) {
    return this._upsertType(concertType, CONCERT_TYPE_TYPE, getConcertTypeID(concertType));
  }

  _upsertType(doc, type, _id) {
    return this._upsert(Object.assign({}, doc, { _id, type }));
  }

  _upsert(doc) {
    return this._sageDB.getAsync(doc._id)
      .then(returnedDoc =>
        this._sageDB.insertAsync(Object.assign({}, doc, { _rev: returnedDoc._rev }))
      ).catch(e =>
        e.error === 'not_found' ? this._sageDB.insertAsync(doc) : e
      );
  }
};
