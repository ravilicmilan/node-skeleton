var auth = require('./auth');
var IndexController = require('../controllers/index');
var UsersController = require('../controllers/users');


module.exports = function(app) {
    // users routes --------------------------------------------------------------------------------------------

    app.get('/api/users', auth.requiresRole('admin'), UsersController.getUsers);
    app.post('/api/users', UsersController.createUser);
    app.post('/api/users/changeRole', auth.requiresRole('admin'), UsersController.changeRole);
    app.put('/api/users', UsersController.updateUser);

   
    // other routes ----------------------------------------------------------------------------------------------
    
    app.post('/login', auth.authenticate);
    
    app.post('/logout', IndexController.logout);
    
    app.get('*', IndexController.home);
};