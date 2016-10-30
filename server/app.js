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
app.get('/initializeforms', (req, res) => {
  Promise.join(
    // this is fine until there are more than 200 of these bad boys
    sageDB.getArrangementTypes(200),
    sageDB.getAlbumFormats(200),
    sageDB.getQualities(200),
    sageDB.getConcertTypes(200),
    sageDB.getSemesters(200),
    sageDB.getAlbums(200),
    sageDB.getConcerts(200),
    sageDB.getGenres(200),
    sageDB.getKeys(200),
    (at, af, q, ct, s, a, c, g, k) => ({
      arrangementTypes: at,
      albumFormats: af,
      qualities: q,
      concertTypes: ct,
      semesters: s,
      albums: a,
      concerts: c,
      genres: g,
      keys: k,
    })
  ).then((data) => {
    res.json(data);
  }).catch((e) => {
    res.status(500);
    res.json(e);
  });
});

/** Get the full arrangement doc */
app.get('/fullarrangement', ({ query: { arrangementID } }, res) => {
  sageDB.getFullArrangement(arrangementID)
    .then(a => res.json(a))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** Get a file from the database */
app.get('/arrangementfile', ({ query: { arrangementID, attachmentID, type } }, res) => {
  sageDB.getArrangementAttachment(arrangementID, attachmentID)
    .then((buffer) => {
      res.set({
        'Content-Disposition': `attachment; filename="${attachmentID}"`,
        'Content-Type': type,
      });
      res.send(buffer);
    })
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** Get the arrangements in the database */
app.get('/arrangements', ({ query: { limit, skip } }, res) => {
  sageDB.getArrangements(limit, skip)
    .then(arrangements => res.json(arrangements))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** POST: Submit a new arrangement */
app.post('/arrangementsubmit', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'finale', maxCount: 1 },
  { name: 'mp3', maxCount: 1 },
]), ({ body, files }, res) => {
  sageDB.upsertArrangement(body, files)
    .then(() => res.json({}))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

app.get('/arrangementexists', ({ query: { name } }, res) => {
  sageDB.arrangementExists(name)
    .then(exists => res.json(exists))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** GET: Let's get some hangovers */
app.get('/search/hangovers', ({ query: { hangover } }, res) => {
  sageDB.searchHangovers(hangover)
    .then(hangovers => res.json(hangovers))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** GET: Let's get some artists */
app.get('/search/artists', ({ query: { artist } }, res) => {
  sageDB.searchArtists(artist)
    .then(artists => res.json(artists))
    .catch((e) => {
      res.status(500);
      res.json(e);
    });
});

/** For everything else, serve the index */
app.get('*', (req, res) => {
  res.sendFile(paths.buildHtml);
});

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
