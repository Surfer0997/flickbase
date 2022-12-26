const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// Middlewares
const auth = require('../middleware/auth');

// bla.com/api/users/profile
router.route('/profile', )
.get(auth('readOwn', 'profile'), userController.profile) // we CAN chain router methods
.patch(auth('updateOwn', 'profile'), userController.updateProfile)

router.route('/likes')
.post(auth('updateOwn', 'profile'), userController.addLikedArticle)
.patch(auth('updateOwn', 'profile'), userController.removeLikedArticle)

router.patch('/email', auth('updateOwn', 'profile'), userController.updateEmail)
router.get('/verifyEmail', userController.verifyEmail)

module.exports = router;