var express = require('express');
var config = require('./config');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var RedisStroe = require('connect-redis')(session);


module.exports = function(){
      var app = express();
      if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
      }else {
        app.use(compression);
      }

//  app.use(session({
//secret: config.sessionSecret,
//resave: false,
 //saveUninitialized: true
//  }));

      app.use(flash());
      app.use(passport.initialize());
      app.use(passport.session());

      app.use(cookieSession({
        name: 'session',
        keys: ['secret_key1', 'secret_key2']
      }));

      app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
      }));

      app.use(session({
        stroe: new RedisStroe({
          host: 'localhost',
          post: 6379,
          db: 2,
          pass: 'redis_password'
        }),
}));

      app.use(bodyParser.urlencoded({
          extended: true
      }));

      app.use(bodyParser.json());
      app.use(validator());
      app.set('views', './app/views');
      app.set('view engine', 'jade');
      require('../app/routes/index.routes')(app);
      require('../app/routes/user.routes')(app);

      app.use(sass({
        src: './sass',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true

      }));
      app.use(express.static('./public'));
      return app;
}
