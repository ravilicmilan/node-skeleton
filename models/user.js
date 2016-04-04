var mongoose = require('mongoose');
var encrypt = require('../utils/encryption');
var config = require('../config/config');

var userSchema = new mongoose.Schema({
	firstName: {
		type:String, 
		required: "{PATH} is required!"
	},
	lastName: {
		type:String, 
		required: "{PATH} is required!"
	},
	username: {
		type: String, 
		required: "{PATH} is required!",
		unique: true
	},
	email: {
		type: String,
		required: "{PATH} is required!",
		unique: true
	},
	salt: {
		type:String, 
		required: "{PATH} is required!"
	},
	hashed_pwd: {
		type:String, 
		required: "{PATH} is required!"
	},
	roles: [String]
});

userSchema.methods =  {
	authenticate: function(password) {
		return encrypt.hashPwd(this.salt, password) === this.hashed_pwd;
	},

	hasRole: function(role) {
		return this.roles.indexOf(role) > -1;
	},

	toJSON: function() {
		var obj = this.toObject();
		delete obj.hashed_pwd;
		delete obj.salt;

		return obj;
	}
};
var User = module.exports = mongoose.model('User', userSchema);

module.exports.createDefaultUser = function() {
	User.find({}, function (err, users) {
		if (users.length === 0) {
			var salt;
			var hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPwd(salt, config.admin.password);

			User.create({
				firstName: config.admin.firstName,
				lastName: config.admin.lastName,
				username: config.admin.username,
				email: config.admin.email,
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
		}
	});
};