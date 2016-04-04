var express = require('express');
var stylus = require('stylus');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    

    app.set('views', config.rootPath + '/views');
    app.set('view engine', 'jade');

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ url: config.db })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(stylus.middleware({
        src: config.rootPath + '/stylus',
        compile: compile
    }));

    app.use(express.static(config.rootPath + '/public'));

};