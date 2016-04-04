var crypto = require('crypto');

exports.createSalt = function() {
	return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function(salt, password) {
	var hmac = crypto.createHmac('sha1', salt);
  	hmac.setEncoding('hex');
  	hmac.write(password);
  	hmac.end();
  	return hmac.read();
};