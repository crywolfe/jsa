var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
var app = express();
var port = process.env.PORT || 3000;
// var logger = require('morgan');


// var routes = require('./routes/index');
// var users = require('./routes/users');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to database

require('./config/passport')(passport); // pass passport for configuration
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev')); // log every request to console

app.use(bodyParser.json()); //get info from html forms
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(express.static(path.join(__dirname, 'public')));


// view engine setup with JADE
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// view engine setup with EJS
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'thisismysecret', resave: false, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// app.use('/', routes);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// module.exports = app;

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
