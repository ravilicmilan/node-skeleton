var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));

    db.once('open', function callback() {
        console.log('DB opened');
    });

    User.createDefaultUser();
};