const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const dbFile = require('./routes/model/model.js');
const session = require('express-session');


/*
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
const webpackHotMiddleware = require('webpack-hot-middleware');
const hotMiddleware = webpackHotMiddleware(compiler);
*/

const app = express();

app.set('views', 'bundle/webpack/');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	key: 'chung_cookie',
	secret: 'session_cookie_secret',
	store: dbFile.sessionStore,
	resave: false,
	saveUninitialized: false
}));


app.use(express.static(path.join(__dirname, 'bundle', 'webpack')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
