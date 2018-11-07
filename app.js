var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//设置路由路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/users');
var signinRouter = require('./routes/user/signin');
var signoutRouter = require('./routes/user/signout');
var signupRouter = require('./routes/user/signup');
var updateRouter = require('./routes/user/update');
var createpostRouter = require('./routes/post/createpost');
var upRouter = require('./routes/post/up');
var meRouter = require('./routes/post/me');

var app = express();

//使用ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'admin', //密钥
    name: 'blogapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 8000000
    }
}));

//设置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/signout', signoutRouter);
app.use('/signup', signupRouter);
app.use('/update', updateRouter);
app.use('/createpost', createpostRouter);
app.use('/up', upRouter);
app.use('/me', meRouter);

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