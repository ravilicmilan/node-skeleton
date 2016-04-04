var User = require('../models/user');
var encrypt = require('../utils/encryption');

var methods = {
	getUsers: getUsers,
	createUser: createUser,
	updateUser: updateUser,
	changeRole: changeRole
};


function getUsers(req, res) {
	User.find({roles: {$not: {$in: ['admin']}}}, 
			{username: 1, firstName: 1, lastName: 1, email: 1}, 
			function(err, users) {
		res.json(users);
	});
};

function createUser(req, res, next) {
	var userData = {};
	userData.firstName = req.body.firstName.trim();
	userData.lastName = req.body.lastName.trim();
	userData.username = req.body.username.toLowerCase();
	userData.email = req.body.email.trim();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, req.body.password);
	userData.roles = ['user'];

	User.create(userData, function(err, user) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('Duplicate username');
			}
			return res.status(400).send({reason: err.toString()});
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			res.send(user);
		});
	});
};

function updateUser(req, res, next) {
	var userData = req.body;

	if (req.user._id != userData._id) {
		res.send(403);
		return res.end();
	}

	req.user.firstName = userData.firstName;
	req.user.lastName = userData.lastName;
	req.user.username = userData.username;
	req.user.email = userData.email;

	if (userData.password && userData.password.length > 0) {
		req.user.salt = encrypt.createSalt();
		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userData.password);
	}

	req.user.save(function(err) {
		if (err) {
			return res.status(400).send({reason: err.toString()});
		}
		res.send(req.user);
	});
};

function changeRole(req, res, next) {
	if (!req.user.hasRole('admin')) {
		return res.send(403).end();
	}

	var id = req.body.id;
	var role = req.body.role;

	User.findById(id).exec(function(err, user) {
		if (err) {
			return res.status(404).send({reason: err.toString()});
		}

		user.roles.push(role);

		user.save(function(err) {
			if (err) {
				return res.status(400).send({reason: err.toString()});
			}	
			
			res.json({success: 'Role For User Updated!'});		
		});
	});
}

module.exports = methods;