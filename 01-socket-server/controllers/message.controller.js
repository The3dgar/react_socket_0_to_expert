const MessageModel = require('../schemas/message.schema');

const LIMIT_MSG = 30;

const getLastMessages = (uid, msgTo) =>
  MessageModel.find({
    $or: [
      { from: uid, to: msgTo },
      { from: msgTo, to: uid },
    ],
  })
    .sort({ createdAt: 'desc' })
    .limit(LIMIT_MSG);

const getChat = async (req, res) => {
  try {
    const { uid } = req;
    const { msgTo } = req.params;

    const messages = await getLastMessages(uid, msgTo);

    res.json({
      messages,
    });
  } catch (error) {
    console.log('getChat', error);
    res.sendStatus(500);
  }
};

module.exports = {
  getChat,
};
