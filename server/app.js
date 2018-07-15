const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const routes = require('./routes');
const passport = require('./modules/passport');

const port = process.env.PORT || 3001;

const app = express();

app.set('port', port);
app.use(logger('dev'));
app.use(session({
  secret: 'sage',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use(express.static(path.resolve(__dirname, '../client/build')));


module.exports = app;
