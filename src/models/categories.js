const mongoose = require('mongoose');

const { Schema } = mongoose;

require('dotenv').config();

const categoriesSchema = new Schema({
  category: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  status: {
    type: Boolean,
    default: true, // 1 show, 0 hide.
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  sort: {
    type: Number,
    required: true,
  }, 
});

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;
