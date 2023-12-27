const mongoose = require('mongoose');

const { Schema } = mongoose;
const ticketsSchema = new Schema({
  ticket: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  orderId: Number,
  type: {
    type: Number,
    required: true,
    default: -1
  },
  customType: {
    text: String,
    value: Number,
  },
  status: {
    type: String,
    enum: ['completed', 'waiting_admin', 'waiting_user', 'new'], // completed = finish. // pending = finish.  // completed = finish.  // completed = finish. 
    default: 'new',
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

const Tickets = mongoose.model('Tickets', ticketsSchema);
module.exports = Tickets;
