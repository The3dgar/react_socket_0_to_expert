const jwt = require('jsonwebtoken');

const generateTkn = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
      (err, tkn) => {
        if (err) reject(err);
        resolve(tkn);
      }
    );
  });
};

const verifyTkn = (tkn) => jwt.verify(tkn, process.env.JWT_SECRET);

module.exports = {
  generateTkn,
  verifyTkn,
};
