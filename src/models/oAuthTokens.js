const mongoose = require('mongoose');

const { Schema } = mongoose;

const oAuthTokensSchema = new Schema({
  tokens: [{
    value: {
      type: String,
      required: true,
    },
    expiration: {
      type: String,
    },
    ip: {
      type: String,
    },
    country: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    browser: {
      type: String,
    },
    typeDevice: {
      type: String,
    },
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const OAuthTokens = mongoose.model('OAuthTokens', oAuthTokensSchema);
module.exports = OAuthTokens;
