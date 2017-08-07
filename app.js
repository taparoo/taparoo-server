const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var http = require('http');
const middleware = require("./middleware");

require('dotenv').config();

const sockets = require('./sockets');

const app = express();

var server = http.createServer(app);
var io = require("socket.io")(server);

sockets(io);

const router = require('./api/router');

app.use(middleware.checkTokenSetUser);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
	origin: "*"
}));

app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
	  message: err.message,
	  error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = {
	app,
	server
};
