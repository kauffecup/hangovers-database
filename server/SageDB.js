const Promise = require('bluebird');
const cloudant = require('cloudant');
const types = require('./cloudantHelpers/DBTypes');
const idgen = require('./cloudantHelpers/IDGenerators');
const { adaptFiles, adaptArrangement, adaptHangover } = require('./cloudantHelpers/Adapters');

const LIMIT = 20;
const OPTS = { concurrency: 3 };

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
   * Getters for retrieving a "full" object and rolling up similar key fields
   * into an array.
   */
  getFullArrangement(arrangementID) { return this._getFullArrayRollup(arrangementID, 'arrangement', ['arrangementType', 'key', 'semesterArranged']); }
  getFullHangover(hangoverID) { return this._getFullArrayRollup(hangoverID, 'hangover'); }
  getFullSemester(semesterID) { return this._getFullArrayRollup(semesterID, 'semester'); }
  getFullConcert(concertID) { return this._getFullArrayRollup(concertID, 'concert'); }
  getFullAlbum(albumID) { return this._getFullArrayRollup(albumID, 'album'); }
  getFullArtist(artistID) { return this._getFullArrayRollup(artistID, 'artist'); }

  /**
   * Here we get a document's metadata along with the original docs for any ids
   * it might link to. We have some cleanup logic for combining into a clean array.
   */
  _getFullArrayRollup(id, view, flatten = []) {
    return this._sageDB.viewAsync('full', view, {
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
      for (const flattenField of flatten) {
        if (doc[flattenField] && doc[flattenField][0]) {
          doc[flattenField] = doc[flattenField][0];
        }
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

  /**
   * Searchers for indexed types
   */
  searchArtists(text = '') { return this._search('artists', `name:(${text.toLowerCase()}*)`); }
  searchArrangements(text = '') { return this._search('arrangements', `name:(${text.toLowerCase()}*)`); }
  searchGenres(text = '') { return this._search('genres', `name:(${text.toLowerCase()}*)`); }
  searchHangovers(text = '') { return this._search('hangovers', `nameString:(${text.toLowerCase()}*)`); }
  searchRelationships(field, id) { return this._search('relationships', `${field}:${id}`, 200); }
  searchTags(text = '') { return this._search('tags', `name:(${text.toLowerCase()}*)`); }

  /** Helper method for the above searchers */
  _search(index, q, limit = LIMIT) {
    return this._sageDB.searchAsync('search', index, {
      q,
      limit,
      include_docs: true,
    }).then(response => response.rows.map(r => r.doc));
  }

  /**
   * Upserts for given doc types. If the doc is already in the database, update
   * it, if not create a new one.
   */
  upsertArrangementType(at) { return this._upsertType(at, types.ARRANGEMENT_TYPE_TYPE, idgen.getArrangementTypeID(at)); }
  upsertSemester(s) { return this._upsertType(s, types.SEMESTER_TYPE, idgen.getSemesterID(s)); }
  upsertAlbum(a) { return this._upsertType(a, types.ALBUM_TYPE, idgen.getAlbumID(a)); }
  upsertAlbumFormat(af) { return this._upsertType(af, types.ALBUM_FORMAT_TYPE, idgen.getAlbumFormatID(af)); }
  upsertConcert(c) { return this._upsertType(c, types.CONCERT_TYPE, idgen.getConcertID(c)); }
  upsertConcertType(ct) { return this._upsertType(ct, types.CONCERT_TYPE_TYPE, idgen.getConcertTypeID(ct)); }
  upsertGenre(g) { return this._upsertType(g, types.GENRE_TYPE, idgen.getGenreID(g)); }
  upsertArtist(a) { return this._upsertType(a, types.ARTIST_TYPE, idgen.getArtistID(a)); }
  upsertTag(t) { return this._upsertType(t, types.TAG_TYPE, idgen.getTagID(t)); }
  upsertKey(k) { return this._upsertType(k, types.KEY_TYPE, idgen.getKeyID(k)); }
  upsertHangover(hangover) {
    const { hangoverID, toUpload, relationships } = adaptHangover(hangover);
    return this._upsertType(toUpload, types.HANGOVER_TYPE, hangoverID)
      .then(() => this.searchRelationships('hangover', hangoverID))
      .then(oldRelationships => this.manageRelationships(relationships, oldRelationships));
  }
  upsertArrangement(arrangement, files = {}) {
    const filesToUpload = adaptFiles(files, arrangement.name);
    const { arrID, toUpload, newArtists = [], newTags = [], relationships = [] } = adaptArrangement(arrangement, filesToUpload);
    console.log('creating new artists and tags');
    return Promise.join(
      Promise.map(newArtists, a => this.upsertArtist(a), OPTS),
      Promise.map(newTags, t => this.upsertTag(t), OPTS),
      () => {}
    ).then(() => {
      console.log('upserting arrangement doc');
      if (filesToUpload.length) {
        return this._upsertTypeWithFiles(toUpload, filesToUpload, types.ARRANGEMENT_TYPE, arrID);
      }
      return this._upsertType(toUpload, types.ARRANGEMENT_TYPE, arrID);
    })
    .then(() => console.log('fetching existing relationships'))
    .then(() => this.searchRelationships('arrangement', arrID))
    .then(oldRelationships => this.manageRelationships(relationships, oldRelationships));
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

  /** Guarantee that the only relationships are the passed in array in as few deletes/adds as possible */
  manageRelationships(relationships, oldRelationships) {
    const oldRelationshipMap = {};
    for (const oldRelationship of oldRelationships) {
      oldRelationshipMap[oldRelationship._id] = oldRelationship;
    }
    const visitedMap = {};
    const relationshipsToUpload = [];
    for (const relationship of relationships) {
      if (oldRelationshipMap[relationship.id]) {
        visitedMap[relationship.id] = true;
      } else {
        relationshipsToUpload.push(relationship);
      }
    }
    const relationshipsToDelete = oldRelationships.filter(or => !visitedMap[or._id]);
    console.log('creating new relationships and deleting stale ones');
    return Promise.join(
      Promise.map(relationshipsToUpload, ({ doc, type, id }) => this._upsertType(doc, type, id), OPTS),
      Promise.map(relationshipsToDelete, ({ _id, _rev }) => this.destroy(_id, _rev), OPTS),
      () => {}
    );
  }
};
