var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        db: 'mongodb://127.0.0.1/someDB',
        rootPath: rootPath,
        port: process.env.PORT || 3000,
        sessionSecret: 'ujka!Mile@Zida$Satelit^625]'
    },

    production: {
        rootPath: rootPath,
        db: '',
        port: process.env.PORT || 80,
        sessionSecret: 'ujka!Mile@Zida$Satelit^625]'
    },

    admin: {
        firstName: 'Pera',
        lastName: 'Kesa',
        username: 'perakesa',
        email: 'pera@kesa.com',
        password: '123456'
    }
};