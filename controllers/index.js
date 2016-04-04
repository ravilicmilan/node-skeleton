var methods = {
	logout: logout,
	home: home
};

function logout(req, res, next) {
	req.logout();
    res.end();
}

function home(req, res, next) {
	res.render('index', {
        bootstrappedUser: req.user || {}
    });		
}

module.exports = methods; 	