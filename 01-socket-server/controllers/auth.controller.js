const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../schemas/user.schema');
const { generateTkn } = require('../helpers/token');

const emailIsUnique = async (email) => UserModel.findOne({ email });
const saveUser = async (user) => new UserModel(user).save();
const encryptPassword = async (ps) => bcrypt.hash(ps, bcrypt.genSaltSync());
const findUserByEmail = async (email) => UserModel.findOne({ email });
const findUserById = async (uid) => UserModel.findById(uid);
const validatePassword = async (ps, userPs) => bcrypt.compareSync(ps, userPs);
const getUsers = async () => UserModel.find({ online: true });

const newUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    if (await emailIsUnique(email)) return res.sendStatus(400);
    req.body.password = await encryptPassword(password);
    const user = await saveUser(req.body);
    const tkn = await generateTkn(user.id);

    res.json({
      user,
      tkn,
    });
  } catch (error) {
    console.log('newUser', error);
    res.sendStatus(500);
  }
};

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.sendStatus(404);

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) return res.sendStatus(401);
    const tkn = await generateTkn(user.id);

    res.json({
      user,
      tkn,
    });
  } catch (error) {
    console.log('login', error);
    res.sendStatus(500);
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const tkn = await generateTkn(uid);
  const user = await findUserById(uid);

  res.json({
    user,
    tkn,
  });
};

module.exports = {
  newUser,
  login,
  renewToken,
  emailIsUnique,
  saveUser,
  encryptPassword,
  findUserByEmail,
  findUserById,
  validatePassword,
  getUsers,
};
