const mongoose = require('mongoose');

const { Schema } = mongoose;
const ticketsMessagesSchema = new Schema({
  ticketsMessage: {
    type: Number,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  isSender: {
    type: String,
    required: true,
    default: 'Admin'
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  isReadAdmin: {
    type: Boolean,
    required: true,
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

const TicketsMessages = mongoose.model('TicketsMessages', ticketsMessagesSchema);
module.exports = TicketsMessages;
