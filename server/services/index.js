// to aviod imports like import authService from '../services/auth.service' => authService.auth.reg.test...
// module.exports.authService = require('./auth.service');
// now we can const {authService} = require('../services');
module.exports.authService = require('./auth.service');
module.exports.userService = require('./user.service');
module.exports.emailService = require('./email.service');
module.exports.articlesService = require('./articles.service');