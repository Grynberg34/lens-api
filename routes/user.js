const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.get('/', passport.authenticate('jwt', {session: false}), authController.checkUser, userController.showUser);

router.post('/create/list', passport.authenticate('jwt', {session: false}), authController.checkUser, userController.createList);

module.exports = router;
