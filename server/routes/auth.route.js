const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');

//// sdsds.com/api/test
// router.get('/test', (req,res)=>{})
router.post('/register', authController.register);
router.post('/signin', authController.signin);

router.get('/isauth', auth(), authController.isauth);


//router.post('/testrole', auth('updateAny', 'test'), authController.testrole);
module.exports = router;