const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const paths = require('../config/paths');
const cloudantConfig = require('../config/cloudantConfig');
const SageDB = require('./SageDB');

const port = process.env.PORT || 3000;

// configure the express server
const app = express();
const sageDB = new SageDB(cloudantConfig);

// configure file uploader
const storage = multer.memoryStorage();
const upload = multer({ storage });

// if we're developing, use webpack middleware for module hot reloading
if (process.env.NODE_ENV === 'development') {
  console.log('==> 🌎 using webpack');
  const { webpackDevMiddleware, webpackHotMiddleware } = require('./appDevServer');

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(paths.appBuild));

/** GET: get the initial data necessary for form stuff */
app.get('/api/initializeforms', (req, res) => {
  Promise.join(
    // this is fine until there are more than 200 of these bad boys
    sageDB.getArrangementTypes(200),
    sageDB.getAlbumFormats(200),
    sageDB.getConcertTypes(200),
    sageDB.getSemesters(200),
    sageDB.getAlbums(200),
    sageDB.getConcerts(200),
    sageDB.getKeys(200),
    (at, af, ct, s, a, c, k) => ({
      arrangementTypes: at,
      albumFormats: af,
      concertTypes: ct,
      semesters: s,
      albums: a,
      concerts: c,
      keys: k,
    })
  )
  .then(data => res.json(data))
  .catch(e => res.status(500).json(e));
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

/** Get a file from the database */
app.get('/api/arrangementfile', ({ query: { arrangementID, attachmentID, type } }, res) => {
  sageDB.getArrangementAttachment(arrangementID, attachmentID)
    .then((buffer) => {
      res.set({
        'Content-Disposition': `attachment; filename="${attachmentID}"`,
        'Content-Type': type,
      });
      res.send(buffer);
    })
    .catch(e => res.status(500).json(e));
});

/** Get a paged list of documents */
const getList = (limit, skip, method, res) =>
  sageDB[method](limit, skip)
    .then(p => res.json(p))
    .catch(e => res.status(500).json(e));

/** Endpoints that use the above helper */
app.get('/api/list/arrangements', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getArrangements', res));
app.get('/api/list/hangovers', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getHangovers', res));
app.get('/api/list/artists', ({ query: { limit, skip } }, res) => getList(limit, skip, 'getArtists', res));

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

/** POST: Submit a new arrangement */
app.post('/api/arrangementsubmit', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'finale', maxCount: 1 },
  { name: 'recording', maxCount: 1 },
]), ({ body, files }, res) => {
  sageDB.upsertArrangement(body, files)
    .then(() => res.json({}))
    .catch(e => res.status(500).json(e));
});

/** Upsert a doc that we're editing */
const edit = (doc, upsertMethod, res) =>
  sageDB[upsertMethod](doc)
    .then(() => res.json({}))
    .catch(e => res.status(500).json(e));

/** endpoints that use the above helper */
app.post('/api/edit/album', ({ body }, res) => edit(body, 'upsertAlbum', res));
app.post('/api/edit/concert', ({ body }, res) => edit(body, 'upsertConcert', res));
app.post('/api/edit/hangover', ({ body }, res) => edit(body, 'upsertHangover', res));
app.post('/api/edit/semester', ({ body }, res) => edit(body, 'upsertSemester', res));

/** GET: see if an arrangement exists */
app.get('/api/arrangementexists', ({ query: { name } }, res) => {
  sageDB.arrangementExists(name)
    .then(exists => res.json(exists))
    .catch(e => res.status(500).json(e));
});

/** DELETE: a document from the database */
app.delete('/api/destroy', ({ query: { _id, _rev } }, res) => {
  sageDB.destroy(_id, _rev)
    .then(() => res.json({}))
    .catch(e => res.status(500).json(e));
});

/** For everything else, serve the index */
app.get('*', (req, res) => {
  res.sendFile(paths.buildHtml);
});

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
