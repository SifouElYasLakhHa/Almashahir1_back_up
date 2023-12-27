const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const providersSchema = new Schema({
  provider: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  key: {
    type: String,
    required: true,
  },
  linkApi: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
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

const Providers = mongoose.model('Providers', providersSchema);
module.exports = Providers;
