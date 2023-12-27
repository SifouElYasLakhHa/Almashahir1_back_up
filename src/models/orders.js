const mongoose = require('mongoose');

require('dotenv').config();

const { Schema } = mongoose;
const ordersSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  orderProviderId: String,
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Services',
  },
  status: {
    type: String, 
    default: 'Processing',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  quantity: {
    type: String,
    default: '',
  },
  charge: {
    type: String,
    required: true,
  },
  chargeProvider: Number,
  remains: {
    type: String,
    default: '0',
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
  link: {
    type: String,
    default: ''
  },
  runs: String,
  interval: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  start_count: {
    type: String,
    default: ''
  },
  answer_number: String,
  comments: String,
  expiry: String,
  delay: String,
  username: String,
  max: String,
  min: String,
  posts: String,
  sendRequest: {
    type: Boolean,
    require: true,
    default: true,
  },
  refill: {
    type: Boolean,
    require: true,
    default: true,
  },
  refillStatus: {
    type: Boolean,
    require: true,
    default: false,
  },
  checker: {
    type: Boolean,
    default: false
  },
  checkerCharge: {
    type: Boolean,
    default: true
  },
  refillTime: {
    type: String,
    default: ''
  },
  refillTimeStart: Date,
  refillTimeStartNow: {
    type: Boolean,
    default: false
  },
});

const Orders = mongoose.model('Orders', ordersSchema);
module.exports = Orders;