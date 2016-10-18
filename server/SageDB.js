const Promise = require('bluebird');
const cloudant = require('cloudant');

// top level objects
const ARRANGEMENT_TYPE = 'arrangement';
const HANGOVER_TYPE = 'hangover';
const SEMESTER_TYPE = 'semester';
const ALBUM_TYPE = 'album';
const CONCERT_TYPE = 'concert';
const GENRE_TYPE = 'genre';
const ARTIST_TYPE = 'artist';
// essentially enums
const ARRANGEMENT_TYPE_TYPE = 'arrangement_type';
const QUALITY_TYPE = 'quality';
const ALBUM_FORMAT_TYPE = 'album_format';
const CONCERT_TYPE_TYPE = 'concert_type';
const KEY_TYPE = 'key';
// form data info
const NEW_IDENTIFIER = 'new:';

const LIMIT = 20;

const getArrangementID = arrangement =>
  `${ARRANGEMENT_TYPE}_${arrangement.name.toLowerCase().replace(/\s/g, '_')}`;

const getArrangementTypeID = arrangementType =>
  `${ARRANGEMENT_TYPE_TYPE}_${arrangementType.name.toLowerCase().replace(/\s/g, '_')}`;

const getHangoverID = hangover =>
  `${HANGOVER_TYPE}_${hangover.lastName.toLowerCase().replace(/\s/g, '_')}_${hangover.firstName.toLowerCase().replace('.', '').replace(/\s/g, '_')}`;

const getSemesterID = semester =>
  `${SEMESTER_TYPE}_${semester.year}_${semester.semester_type.toLowerCase()}`;

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

const getGenreID = genre =>
  `${GENRE_TYPE}_${genre.name.toLowerCase().replace(/\s/g, '_')}`;

const getArtistID = artist =>
  `${ARTIST_TYPE}_${artist.name.toLowerCase().replace(/\s/g, '_')}`;

const getKeyID = key =>
  `${KEY_TYPE}_${key.name.toLowerCase().replace(/\s/g, '_')}`;

const fileAdapt = (f, name, dot) => ({
  name: `${name.toLowerCase().replace(/\s/g, '_')}.${dot}`,
  content_type: f.mimetype,
  data: f.buffer,
});

module.exports = class SageDB {
  constructor(config) {
    const c = cloudant({ account: config.username, password: config.password });
    this._sageDB = Promise.promisifyAll(c.use('sage'));
    this._sageDBMulti = Promise.promisifyAll(this._sageDB.multipart);
  }

  initialize(config) {
    return new Promise((resolve, reject) => {
      const c = cloudant({ account: config.username, password: config.password });
      c.db.create('sage', (e) => {
        if (!e || (e && e.error === 'file_exists')) {
          this._sageDB = Promise.promisifyAll(c.use('sage'));
          resolve();
        } else {
          console.error(e);
          reject(e);
        }
      });
    });
  }

  addIndex(index) {
    return this._sageDB.indexAsync(index);
  }

  /**
   * Getters for all the types defined above. Each method returns a promise that
   * resolves with the response from cloudant. We do processing on the rows to
   * return the doc.
   */
  getArrangements(limit, skip) { return this._view('arrangements', limit, skip); }
  getArrangementTypes(limit, skip) { return this._view('arrangement_types', limit, skip); }
  getHangovers(limit, skip) { return this._view('hangovers', limit, skip); }
  getSemesters(limit, skip) { return this._view('semesters', limit, skip); }
  getAlbums(limit, skip) { return this._view('albums', limit, skip); }
  getAlbumFormats(limit, skip) { return this._view('album_formats', limit, skip); }
  getQualities(limit, skip) { return this._view('qualities', limit, skip); }
  getConcerts(limit, skip) { return this._view('concerts', limit, skip); }
  getConcertTypes(limit, skip) { return this._view('concert_types', limit, skip); }
  getGenres(limit, skip) { return this._view('genres', limit, skip); }
  getArtists(limit, skip) { return this._view('artists', limit, skip); }
  getKeys(limit, skip) { return this._view('keys', limit, skip); }

  /** Helper method for above getters */
  _view(type, limit = LIMIT, skip = 0) {
    return this._sageDB.viewAsync('types', type, {
      include_docs: true,
      limit,
      skip,
    }).then(response => Object.assign({}, response, {
      rows: response.rows.map(r => r.doc),
    }));
  }

  searchHangovers(text = '') {
    return this._sageDB.searchAsync('search', 'hangovers', {
      q: `nameString:(${text.toLowerCase()}*)`,
      limit: 20,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  searchArtists(text = '') {
    return this._sageDB.searchAsync('search', 'artists', {
      q: `name:(${text.toLowerCase()}*)`,
      limit: 20,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  /**
   * Upserts for given doc types. If the doc is already in the database, update
   * it, if not create a new one.
   */
  upsertArrangementType(at) { return this._upsertType(at, ARRANGEMENT_TYPE_TYPE, getArrangementTypeID(at)); }
  upsertHangover(h) { return this._upsertType(h, HANGOVER_TYPE, getHangoverID(h)); }
  upsertSemester(s) { return this._upsertType(s, SEMESTER_TYPE, getSemesterID(s)); }
  upsertAlbum(a) { return this._upsertType(a, ALBUM_TYPE, getAlbumID(a)); }
  upsertAlbumFormat(af) { return this._upsertType(af, ALBUM_FORMAT_TYPE, getAlbumFormatID(af)); }
  upsertQuality(q) { return this._upsertType(q, QUALITY_TYPE, getQualityID(q)); }
  upsertConcert(c) { return this._upsertType(c, CONCERT_TYPE, getConcertID(c)); }
  upsertConcertType(ct) { return this._upsertType(ct, CONCERT_TYPE_TYPE, getConcertTypeID(ct)); }
  upsertGenre(g) { return this._upsertType(g, GENRE_TYPE, getGenreID(g)); }
  upsertArtist(a) { return this._upsertType(a, ARTIST_TYPE, getArtistID(a)); }
  upsertKey(k) { return this._upsertType(k, KEY_TYPE, getKeyID(k)); }
  upsertArrangement(arrangement, files = {}) {
    const toUpload = Object.assign({}, arrangement);
    const filesToUpload = [];
    if (files.pdf && files.pdf.length) {
      filesToUpload.push(fileAdapt(files.pdf[0], toUpload.name, 'pdf'));
    }
    if (files.finale && files.finale.length) {
      filesToUpload.push(fileAdapt(files.finale[0], toUpload.name, 'mus'));
    }
    // TODO: it would be nice to generalize these somehow
    toUpload.syllables = toUpload.syllables === 'true';
    const arrayFields = ['albums', 'arrangers', 'concerts', 'soloists', 'whenPerformed'];
    for (const arrayField of arrayFields) {
      if (toUpload[arrayField]) {
        toUpload[arrayField] = [].concat(toUpload[arrayField]);
      }
    }
    if (toUpload.originalArtists) {
      toUpload.originalArtists = [].concat(toUpload.originalArtists).map((oa) => {
        console.log(oa);
        console.log(oa.indexOf(NEW_IDENTIFIER));
        if (oa.indexOf(NEW_IDENTIFIER) > -1) {
          const artistName = oa.substring(oa.indexOf(NEW_IDENTIFIER) + NEW_IDENTIFIER.length);
          const artist = { name: artistName };
          this.upsertArtist(artist);
          return getArtistID(artist);
        }
        return oa;
      });
    }
    // time to upsert
    if (filesToUpload.length) {
      return this._upsertTypeWithFiles(toUpload, filesToUpload, ARRANGEMENT_TYPE, getArrangementID(toUpload));
    }
    return this._upsertType(toUpload, ARRANGEMENT_TYPE, getArrangementID(toUpload));
  }

  /** Format the call to _upsert for the above doc types */
  _upsertType(doc, type, _id) {
    return this._upsert(Object.assign({}, doc, { _id, type }));
  }

  /** Format the call to _upsertWithFiles for the above doc types */
  _upsertTypeWithFiles(doc, files, type, _id) {
    return this._upsertWithFiles(Object.assign({}, doc, { _id, type }), files, _id);
  }

  /** Handle the upserting logic for cloudant */
  _upsert(doc) {
    return this._sageDB.getAsync(doc._id)
      .then(returnedDoc =>
        this._sageDB.insertAsync(Object.assign({}, doc, { _rev: returnedDoc._rev }))
      ).catch(e =>
        e.error === 'not_found' ? this._sageDB.insertAsync(doc) : e
      );
  }

  /** Handles upserting logic for docs with files */
  _upsertWithFiles(doc, files) {
    return this._sageDB.getAsync(doc._id)
      .then(returnedDoc =>
        this._sageDBMulti.insertAsync(Object.assign({}, doc, { _rev: returnedDoc._rev }), files, doc._id)
      ).catch(e =>
        e.error === 'not_found' ? this._sageDBMulti.insertAsync(doc, files, doc._id) : e
      );
  }
};
