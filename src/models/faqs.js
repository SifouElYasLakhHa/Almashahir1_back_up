const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const faqsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean, // 1 show, 0 hide
    default: true
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

const Faqs = mongoose.model('Faqs', faqsSchema);
module.exports = Faqs;
