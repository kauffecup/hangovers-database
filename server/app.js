const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const routes = require('./routes');

const port = process.env.PORT || 3001;

const app = express();

app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/', routes);

module.exports = app;
