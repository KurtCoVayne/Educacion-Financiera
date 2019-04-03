const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const exphbs = require('express-handlebars')

const app = express();
require('./database');
require('./config/passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  helpers: require('./helpers/Handlebars-helpers').helpers,
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'lost-on-you',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session())


app.use(flash());
// Global variables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg')
  res.locals.fail_msg = req.flash('fail_msg');
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null;
  next();
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/favicon.ico', express.static('img/favicon.ico'));

//ROUTING
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
