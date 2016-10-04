const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const paths = require('../config/paths');
const SageDB = require('./SageDB');
const cloudantConfig = require('../config/cloudant.json');
const multer = require('multer');

const port = process.env.PORT || 3000;

// configure the express server
const app = express();
const sageDB = new SageDB(cloudantConfig);

// configure file uploader
const upload = multer({ dest: paths.tempFileUpload });

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

app.post('/arrangementsubmit', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'finale', maxCount: 1 },
]), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.json({});
});

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
