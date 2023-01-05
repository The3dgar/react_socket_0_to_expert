const { verifyTkn } = require('../helpers/token');

const validateTkn = (req,res,next) => {
  const tkn= req.headers['x-token'];
  if (!tkn) return res.sendStatus(401);

  try {
    const {uid} = verifyTkn(tkn);
    req.uid = uid;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}

module.exports = {
  validateTkn
}