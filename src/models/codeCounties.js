const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { Schema } = mongoose;
const codeCountiesSchema = new Schema({
  country: {
    type: String,
    required: true,
    unique: true,
  },
  codeCountry: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const CodeCounties = mongoose.model('CodeCounties', codeCountiesSchema);
module.exports = CodeCounties;
