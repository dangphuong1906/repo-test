"use strict";

var _require = require('express'),
    application = _require.application;

var express = require('express');

var router = express.Router();

var userController = require('../controllers/user.controller');

var homepageController = require('../controllers/homepage.controller');

var authMiddleware = require('../middleware/authRegister.middleware');

router.get('/', userController.homepage);
router.get('/register', userController.getRegister);
router.post('/register', authMiddleware.authRegister, userController.postRegister);
router.get('/login', userController.getLogin);
router.post('/login', authMiddleware.authLogin, userController.postLogin);
module.exports = router;