const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
  check('name','Name is required').notEmpty(),
  check('email','Valid email is required').isEmail(),
  check('password','Password min 6 chars').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

module.exports = router;
