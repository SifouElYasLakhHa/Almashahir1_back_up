const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/almashahir1_default';
exports.connectDB = async () => {
  mongoose
    .connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Connected Successfully'))
    .catch((e) => {
      console.error(e)
      console.error('Not Connected')
    });
};
