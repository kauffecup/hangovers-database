// configure environment variables first
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });
// module imports
const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const fs = require('fs');
const sageDB = require('./sageDB');
const backblaze = require('./backblaze');

const port = process.env.PORT || 3001;

// configure the express server
const app = express();

// configure file uploader
const upload = multer({ dest: 'tmp' });

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

/** GET: get the initial data necessary for form stuff */
app.get('/api/initializeforms', async (req, res) => {
  
  // requestion 200 is fine until there are more than 200 of these bad boys
  try {
    const arrangementTypes = await sageDB.getArrangementTypes(200);
    const albumFormats = await sageDB.getAlbumFormats(200);
    const concertTypes = await sageDB.getConcertTypes(200);
    const semesters = await sageDB.getSemesters(200);
    const albums = await sageDB.getAlbums(200);
    const concerts = await sageDB.getConcerts(200);
    const keys = await sageDB.getKeys(200);
    res.json({
      arrangementTypes,
      albumFormats,
      concertTypes,
      semesters,
      albums,
      concerts,
      keys,
    })
  } catch (e) {
    res.status(500).json(e);
  }
});

/** Get the full doc */
const getFull = (id, method, res) =>
  sageDB[method](id)
    .then(a => res.json(a))
    .catch(e => res.status(500).json(e));

/** Endpoints that use the above helper **/
app.get('/api/full/arrangement', ({ query: { arrangementID } }, res) => getFull(arrangementID, 'getFullArrangement', res));
app.get('/api/full/hangover', ({ query: { hangoverID } }, res) => getFull(hangoverID, 'getFullHangover', res));
app.get('/api/full/semester', ({ query: { semesterID } }, res) => getFull(semesterID, 'getFullSemester', res));
app.get('/api/full/concert', ({ query: { concertID } }, res) => getFull(concertID, 'getFullConcert', res));
app.get('/api/full/album', ({ query: { albumID } }, res) => getFull(albumID, 'getFullAlbum', res));
app.get('/api/full/artist', ({ query: { artistID } }, res) => getFull(artistID, 'getFullArtist', res));
app.get('/api/full/tag', ({ query: { tagID } }, res) => getFull(tagID, 'getFullTag', res));
app.get('/api/full/nonhangover', ({ query: { nonHangoverID } }, res) => getFull(nonHangoverID, 'getFullNonHangover', res));

/** Get a file from the database */
app.get('/api/file', ({ query: { fileName, bucketName } }, res) => {
  backblaze.downloadFile(fileName, bucketName, stream => {
    res.set({ 'Content-Disposition': `attachment; filename="${fileName}"` });
    stream.pipe(res)
  });
});

/** Get a paged list of documents */
const getList = (limit, skip, method, res) =>
  sageDB[method](limit, skip)
    .then(p => res.json(p))
    .catch(e => res.status(500).json(e));

/** Endpoints that use the above helper */
app.get('/api/list/arrangements', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getArrangements', res));
app.get('/api/list/artists', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getArtists', res));
app.get('/api/list/hangovers', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getHangovers', res));
app.get('/api/list/tags', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getTags', res));

/** Perform a search in the database */
const search = (text, method, res) =>
  sageDB[method](text)
    .then(hangovers => res.json(hangovers))
    .catch(e => res.status(500).json(e));

/** Endpoints that use the above helper */
app.get('/api/search/artists', ({ query: { artist } }, res) => search(artist, 'searchArtists', res));
app.get('/api/search/arrangements', ({ query: { arrangement } }, res) => search(arrangement, 'searchArrangements', res));
app.get('/api/search/genres', ({ query: { genre } }, res) => search(genre, 'searchGenres', res));
app.get('/api/search/hangovers', ({ query: { hangover } }, res) => search(hangover, 'searchHangovers', res));
app.get('/api/search/tags', ({ query: { tag } }, res) => search(tag, 'searchTags', res));
app.get('/api/search/nonhangovers', ({ query: { nonHangover } }, res) => search(nonHangover, 'searchNonHangovers', res));

/** POST: Submit a new arrangement: handle file management and db management */
app.post('/api/arrangementsubmit', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'finale', maxCount: 1 },
  { name: 'recording', maxCount: 1 },
]), ({ body, files }, res) => {
  const { adaptedFiles, deletedFiles } = backblaze.adaptFiles(files, body);
  // to add/edit an arrangement need to update cloudant data and backblaze files
  Promise.join(
    sageDB.upsertArrangement(body, adaptedFiles, deletedFiles),
    backblaze.uploadFiles(adaptedFiles),
    backblaze.deleteFiles(deletedFiles),
    () => {}
  ).then(() => {
    // once everything is uploaded, remove the temporary files
    for (const file of Object.keys(adaptedFiles)) {
      if (adaptedFiles[file].path) {
        console.log(`removing ${adaptedFiles[file].path}`);
        fs.unlinkSync(adaptedFiles[file].path);
      }
    }
  }).then(() => res.json({}))
    .catch(e => res.status(500).json(e));
});

/** Upsert a doc that we're adding or editing */
const submit = (doc, upsertMethod, res) =>
  sageDB[upsertMethod](doc)
    .then(() => res.json({}))
    .catch(e => res.status(500).json(e));

/** endpoints that use the above helper */
app.post('/api/submit/album', ({ body }, res) => submit(body, 'upsertAlbum', res));
app.post('/api/submit/artist', ({ body }, res) => submit(body, 'upsertArtist', res));
app.post('/api/submit/concert', ({ body }, res) => submit(body, 'upsertConcert', res));
app.post('/api/submit/hangover', ({ body }, res) => submit(body, 'upsertHangover', res));
app.post('/api/submit/semester', ({ body }, res) => submit(body, 'upsertSemester', res));
app.post('/api/submit/tag', ({ body }, res) => submit(body, 'upsertTag', res));
app.post('/api/submit/nonhangover', ({ body }, res) => submit(body, 'upsertNonHangover', res));

/** GET: see if an arrangement exists */
app.get('/api/arrangementexists', ({ query: { name } }, res) => {
  sageDB.arrangementExists(name)
    .then(exists => res.json(exists))
    .catch(e => res.status(500).json(e));
});

/** delete documents from the database */
const destroy = (_id, _rev, deleteMethod, res) =>
  sageDB[deleteMethod](_id, _rev)
    .then(() => res.json({}))
    .catch(e => res.status(500).json(e));

/** endpoints for deleting */
app.delete('/api/destroy/album', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyAlbum', res));
app.delete('/api/destroy/artist', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyArtist', res));
app.delete('/api/destroy/concert', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyConcert', res));
app.delete('/api/destroy/hangover', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyHangover', res));
app.delete('/api/destroy/semester', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroySemester', res));
app.delete('/api/destroy/tag', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyTag', res));
app.delete('/api/destroy/nonhangover', ({ query: { _id, _rev } }, res) => destroy(_id, _rev, 'destroyNonHangover', res));
app.delete('/api/destroy/arrangement', ({ query: { _id, _rev } }, res) => {
  sageDB.getArrangementFiles(_id).then(files => Promise.join(
    backblaze.deleteFiles(files),
    sageDB.destroyArrangement(_id, _rev),
    () => {}
  )).then(() => res.json({}))
    .catch(e => res.status(500).json(e));
});

/** For everything else, serve the index */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
