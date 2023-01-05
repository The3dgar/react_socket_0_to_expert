const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.DB_URL, {
        dbName: 'socket_chat',
      })
      .then(() => {
        console.log('DB CONNECTED');
      });
  } catch (error) {
    console.log('error db', error);
  }
};

module.exports = { dbConnection };
