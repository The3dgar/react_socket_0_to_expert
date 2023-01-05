// xd
const MessageModel = require('../schemas/message.schema');
const UserModel = require('../schemas/user.schema');
// xd
const { findUserById } = require('./auth.controller');

const userConnected = async (uid) => {
  const user = await findUserById(uid);
  user.online = true;
  await user.save();
  return user;
};

const userDisconnected = async (user) => {
  user.online = false;
  return user.save();
};

const getUsersOnline = async () => {
  const users = await UserModel.find().sort('-online');
  return users;
};

const saveMessage = async (payload) => {
  try {
    const msg = new MessageModel(payload);
    await msg.save();
    return msg;
  } catch (error) {
    console.log('saveMessage', error.toString());
  }
};

module.exports = {
  userConnected,
  userDisconnected,
  getUsersOnline,
  saveMessage
};
