const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const paymentsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  newUser: {
    type: Boolean,
    required: true,
    default: true,
  },
  description: String,
  keys: [{
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
  }],
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  min: {
    type: Number,
    required: true,
    default: 10
  },
  max: {
    type: Number,
    required: true,
    default: 1000000000000 // '$$$$$$$$$$$ hhhhhhhhhhhhhhhhhhhhhhhhhhh
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  discount: {
    type: Number,
    required: true,
    default: 0 //%
  }
});

const Payments = mongoose.model('Payments', paymentsSchema);
module.exports = Payments;
