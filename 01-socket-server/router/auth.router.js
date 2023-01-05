const { Router } = require('express');
const { check } = require('express-validator');
const { validatorRequest } = require('../middlewares/validatorRequest');
const { validateTkn } = require('../middlewares/validateTkn');
const {
  newUser,
  login,
  renewToken,
} = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is required').notEmpty().isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  validatorRequest,
  newUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  validatorRequest,
  login
);

router.get('/renew', validateTkn, renewToken);

module.exports = router;
