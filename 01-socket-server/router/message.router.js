const { Router } = require('express');
const { check } = require('express-validator');
const { validatorRequest } = require('../middlewares/validatorRequest');
const { validateTkn } = require('../middlewares/validateTkn');
const { getChat } = require('../controllers/message.controller');

const router = Router();

router.get('/:msgTo', validateTkn, getChat);

module.exports = router;
