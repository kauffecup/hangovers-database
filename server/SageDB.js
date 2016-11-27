const Promise = require('bluebird');
const cloudant = require('cloudant');
const types = require('./cloudantHelpers/DBTypes');
const idgen = require('./cloudantHelpers/IDGenerators');
const { adaptFile, adaptFiles, adaptArrangement } = require('./cloudantHelpers/Adapters');
const { fileFields } = require('../shared/FormConstants');

const LIMIT = 20;

module.exports = class SageDB {
  constructor(config) {
    const c = cloudant({ account: config.username, password: config.password });
    this._sageDB = Promise.promisifyAll(c.use('sage'));
    this._sageDBMulti = Promise.promisifyAll(this._sageDB.multipart);
    this._sageDBAttachment = Promise.promisifyAll(this._sageDB.attachment);
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
   * Here we get the arrangement metadata along with all the original docs for
   * various fields (for example we fetch the full hangover for arrangers or soloists
   * instead of just the `hangover_jonathan_kaufman` field) and combine them into
   * one doc. Resolve with that one!
   */
  getFullArrangement(arrangementID) {
    return this._sageDB.viewAsync('types', 'arrangement_full', {
      include_docs: true,
      startkey: [arrangementID],
      endkey: [arrangementID, {}, {}],
      limit: 200,
    }).then(({ rows }) => {
      if (!rows || !rows.length) {
        throw new Error('No arrangement found');
      }
      const doc = rows[0].doc; // TODO: is this always true?
      // this seems rather hacky, but uhh looks like it works!
      // likely because the keys are constructed from the original doc?
      for (let i = 1; i < rows.length; i++) {
        const rowKey = rows[i].key;
        const rowDoc = rows[i].doc;
        if (rowDoc) {
          if (rowKey.length === 2) {
            doc[rowKey[1]] = rowDoc;
          } else if (rowKey.length === 3) {
            doc[rowKey[1]][rowKey[2]] = rowDoc;
          }
        }
      }
      return doc;
    });
  }

  /**
   * Getters for retrieving a "full" object and rolling up similar key fields
   * into an array.
   */
  getFullHangover(hangoverID) { return this._getFullArrayRollup(hangoverID, 'hangover_full'); }
  getFullSemester(semesterID) { return this._getFullArrayRollup(semesterID, 'semester_full'); }
  getFullConcert(concertID) { return this._getFullArrayRollup(concertID, 'concert_full'); }
  getFullAlbum(albumID) { return this._getFullArrayRollup(albumID, 'album_full'); }
  getFullArtist(artistID) { return this._getFullArrayRollup(artistID, 'artist_full'); }

  /**
   * Here we get a document's metadata along with the original docs for any ids
   * it might link to. We have some cleanup logic for combining into a clean array.
   */
  _getFullArrayRollup(id, view) {
    return this._sageDB.viewAsync('types', view, {
      include_docs: true,
      startkey: [id],
      endkey: [id, {}],
      limit: 200,
    }).then(({ rows }) => {
      if (!rows || !rows.length) {
        throw new Error('I still haven\'t found what I\'m looking for');
      }
      const doc = rows[0].doc;  // TODO: is this always true?
      const docArrays = {};
      for (let i = 1; i < rows.length; i++) {
        const rowKey = rows[i].key;
        const rowDoc = rows[i].doc;
        if (rowDoc && rowKey.length === 2) {
          if (!docArrays[rowKey[1]]) {
            docArrays[rowKey[1]] = [];
          }
          docArrays[rowKey[1]].push(rowDoc);
        }
      }
      for (const arrayName of Object.keys(docArrays)) {
        doc[arrayName] = docArrays[arrayName];
      }
      return doc;
    });
  }

  /** Resolves with true if an arrangement exists, false otherwise */
  arrangementExists(name = '') {
    return new Promise((resolve, reject) =>
      this._sageDB.getAsync(idgen.getArrangementID({ name }))
        .then(() => resolve(true))
        .catch(e => e.error === 'not_found' ? resolve(false) : reject(e))
    );
  }

  /** Get an attachment (file) from the database. Resolves with a buffer. */
  getArrangementAttachment(arrangementID, attachmentID) {
    return this._sageDBAttachment.getAsync(arrangementID, attachmentID);
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
      limit: LIMIT,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  searchArtists(text = '') {
    return this._sageDB.searchAsync('search', 'artists', {
      q: `name:(${text.toLowerCase()}*)`,
      limit: LIMIT,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  searchGenres(text = '') {
    return this._sageDB.searchAsync('search', 'genres', {
      q: `name:(${text.toLowerCase()}*)`,
      limit: LIMIT,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  /**
   * Upserts for given doc types. If the doc is already in the database, update
   * it, if not create a new one.
   */
  upsertArrangementType(at) { return this._upsertType(at, types.ARRANGEMENT_TYPE_TYPE, idgen.getArrangementTypeID(at)); }
  upsertHangover(h) { return this._upsertType(h, types.HANGOVER_TYPE, idgen.getHangoverID(h)); }
  upsertSemester(s) { return this._upsertType(s, types.SEMESTER_TYPE, idgen.getSemesterID(s)); }
  upsertAlbum(a) { return this._upsertType(a, types.ALBUM_TYPE, idgen.getAlbumID(a)); }
  upsertAlbumFormat(af) { return this._upsertType(af, types.ALBUM_FORMAT_TYPE, idgen.getAlbumFormatID(af)); }
  upsertConcert(c) { return this._upsertType(c, types.CONCERT_TYPE, idgen.getConcertID(c)); }
  upsertConcertType(ct) { return this._upsertType(ct, types.CONCERT_TYPE_TYPE, idgen.getConcertTypeID(ct)); }
  upsertGenre(g) { return this._upsertType(g, types.GENRE_TYPE, idgen.getGenreID(g)); }
  upsertArtist(a) { return this._upsertType(a, types.ARTIST_TYPE, idgen.getArtistID(a)); }
  upsertKey(k) { return this._upsertType(k, types.KEY_TYPE, idgen.getKeyID(k)); }
  upsertArrangement(arrangement, files = {}) {
    let filesToUpload = adaptFiles(files, arrangement.name);
    const alreadyInDB = arrangement._id && arrangement._rev;
    // ok, this is a bit of a mess, but i swear it's necessary. if we're editing
    // this arrangement and it already has files in the database, we have to fetch
    // them and re-add them. this is annoying and there definitely exists a way to
    // not do this (probably). we do it this way especially if we're renaming the
    // arrangement as there's no way to transfer attachments directly. so anyway,
    // we fetch the existing files by looking in the arrangement file fields which'll
    // be of the format `${attachmentID},${content_type}`. we then format the object
    // to be the same as what's returned in adaptFiles
    const filesProm = alreadyInDB ? Promise.map(
      [...fileFields].map(field => arrangement[field]).filter(fileInfo => !!fileInfo),
      (fileInfo) => {
        const [attachmentID, type] = fileInfo.split(',');
        const split = attachmentID.split('.');
        const dot = split[split.length - 1];
        return this.getArrangementAttachment(arrangement._id, attachmentID)
          .then(buffer => adaptFile(buffer, arrangement.name, type, dot));
      }
    ) : Promise.resolve([]);
    const toUpload = adaptArrangement(arrangement, artist => this.upsertArtist(artist));
    // if we're updating an arrangement such that one of its newly changed fields
    // will change the ID of the document, we delete the old doc and create a new
    // one. otherwise we simply upsert. in either case we have to call different
    // methods if we're also adding files.
    const arrID = idgen.getArrangementID(toUpload);
    const deleteAndReAdd = alreadyInDB && (toUpload._id !== arrID);
    return filesProm.then((otherFiles) => {
      filesToUpload = [...filesToUpload, ...otherFiles];
      if (deleteAndReAdd) {
        if (filesToUpload.length) {
          return this._destroyAndAddWithFiles(toUpload, arrID, filesToUpload);
        }
        return this._destroyAndAdd(toUpload, arrID);
      } else if (filesToUpload.length) {
        return this._upsertTypeWithFiles(toUpload, filesToUpload, types.ARRANGEMENT_TYPE, arrID);
      }
      return this._upsertType(toUpload, types.ARRANGEMENT_TYPE, arrID);
    });
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
        this._sageDB.insertAsync(
          Object.assign({}, doc, { _rev: returnedDoc._rev })
        )
      ).catch(e =>
        e.error === 'not_found' ? this._sageDB.insertAsync(doc) : e
      );
  }

  /** Handles upserting logic for docs with files */
  _upsertWithFiles(doc, files) {
    return this._sageDB.getAsync(doc._id)
      .then(returnedDoc =>
        this._sageDBMulti.insertAsync(
          Object.assign({}, doc, { _rev: returnedDoc._rev }),
          files,
          doc._id
        )
      ).catch(e =>
        e.error === 'not_found' ? this._sageDBMulti.insertAsync(doc, files, doc._id) : e
      );
  }

  /** Destroy an existing doc and add it with a new ID */
  _destroyAndAdd(doc, newID) {
    const newDoc = Object.assign({}, doc, { _id: newID });
    delete newDoc._rev;
    return this.destroy(doc._id, doc._rev)
      .then(() => this._sageDB.insertAsync(newDoc));
  }

  /** Destroy an existing doc and add it with a new ID and some files */
  _destroyAndAddWithFiles(doc, newID, files) {
    const newDoc = Object.assign({}, doc, { _id: newID });
    delete newDoc._rev;
    return this.destroy(doc._id, doc._rev)
      .then(() => this._sageDBMulti.insertAsync(newDoc, files, newDoc._id));
  }

  /** Destroy a doc */
  destroy(id, rev) {
    return this._sageDB.destroyAsync(id, rev);
  }
};
