/** Module dependencies. */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const paths = require('../config/paths');
const { initialize } = require('./arrangementsDB');
const cloudantConfig = require('../config/cloudant.json');

const port = process.env.PORT || 3000;

// configure the express server
const app = express();
initialize(cloudantConfig);

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

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
