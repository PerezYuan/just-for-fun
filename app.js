var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var session = require('express-session')
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var login = require('./routes/login');
var shop = require('./routes/shop');
var company = require('./routes/company');
var bannerUrl = require('./routes/bannerUrl');
var employee = require('./routes/employee');
var upload = require('./routes/upload');
var service = require('./routes/service');
var title = require('./routes/title');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('yzm'));
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
  name: "userId",
  secret: "yzm",
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 }
}));

app.use('/', index);
app.use('/', login);
app.use('/', shop);
app.use('/', employee);
app.use('/', company)
app.use('/', bannerUrl)
app.use('/', service)
app.use('/', upload)
app.use('/', title)

// app.get(/^(?!.*api)/, function (req, res) {
//   // console.log(req.header.cookies)
//   // console.log(req.session.loginUser)
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
