const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const typesServicesSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const TypesServices = mongoose.model('TypesServices', typesServicesSchema);
module.exports = TypesServices;
