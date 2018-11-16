var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

//设置路由路径
var indexRouter = require('./routes/index');
var signinRouter = require('./routes/user/signin');
var signoutRouter = require('./routes/user/signout');
var signupRouter = require('./routes/user/signup');
var updateRouter = require('./routes/user/update');
var createpostRouter = require('./routes/post/createpost');
var upRouter = require('./routes/post/up');
var meRouter = require('./routes/post/me');
var postRouter = require('./routes/post/post');

var app = express();

//使用ejs11
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
    db: "0"
  }),
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: { maxAge: 1000000 }
}))


app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

//设置路由
app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);
app.use('/signup', signupRouter);
app.use('/update', updateRouter);
app.use('/createpost', createpostRouter);
app.use('/up', upRouter);
app.use('/me', meRouter);
app.use('/post', postRouter);

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
  res.render('error');
});

module.exports = app;