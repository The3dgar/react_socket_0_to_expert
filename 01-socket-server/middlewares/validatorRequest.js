const { validationResult } = require('express-validator');

const validatorRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { validatorRequest };
