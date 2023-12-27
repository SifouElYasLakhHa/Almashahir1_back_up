const mongoose = require('mongoose');

const { Schema } = mongoose;
const notificationsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['advertisement', 'close', 'normal', 'success'],
    default: 'system',
  },
  addBy: {
    type: String,
    required: true,
    enum: ['superAdmin', 'supervisor', 'system', 'support'],
    default: 'system',
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    text: String,
    review: Number,
  }]
});

const Notifications = mongoose.model('Notifications', notificationsSchema);
module.exports = Notifications;
