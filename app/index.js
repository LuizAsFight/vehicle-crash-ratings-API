const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const DEFAULT_MESSAGE_ERROR = 'Whoops. Something went wrong, please try again in a few minutes or contact us.';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(require('./routes'));


app.use(function (req, res, next) {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || DEFAULT_MESSAGE_ERROR;

  console.error(err.stack);
  res.status(status).send({ message });
});

module.exports = app;