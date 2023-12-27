const mongoose = require('mongoose');

const { Schema } = mongoose;
const notificationsSchema = new Schema({
  notification: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['warning', 'close', 'normal', 'success'],
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
});

const Notifications = mongoose.model('Notifications', notificationsSchema);
module.exports = Notifications;
