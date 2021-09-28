const { application } = require('express');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const homepageController = require('../controllers/homepage.controller');
const authMiddleware = require('../middleware/authRegister.middleware');
 

router.get('/', userController.homepage);

router.get('/register', userController.getRegister);
router.post('/register', authMiddleware.authRegister, userController.postRegister);

router.get('/login', userController.getLogin);
router.post('/login', authMiddleware.authLogin, userController.postLogin);

module.exports = router;