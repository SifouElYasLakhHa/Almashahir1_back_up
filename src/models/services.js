const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const servicesSchema = new Schema({
  service: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  sortCategory: {
    type: Number,
    required: true,
  },
  sort: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: ''
  }, 
  price: {
    originalPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
  },
  serviceProviderId: String,
  nameCategoryProvider: String,
  providerId: {
    type: Schema.Types.ObjectId,
    ref: 'Providers',
  },
  addType: {
    type: String,
    enum: ['api', 'manual'],
  },
  status: {
    type: Boolean,
    default: true, // 1 show, 0 hide.
  },
  type: {
    type: String,
    required: true,
  },
  fullRate: {
    type: Number,
    default: 0
  },
  rate: {
    status: {
      type: Boolean,
    },
    type: { // 0 fixed_price 1 fixed  2 percentage   3 both
      type: Number,
      enum: [0, 1, 2, 3],
    },
    fixed: Number,
    percentage: Number,
  },
  rating: {
    type: Number,
    default: 0
  },
  min: {
    type: String,
    required: true,
  },
  minSyc: {
    type: Boolean,
    required: true,
    default: true,
  },
  maxSyc: {
    type: Boolean,
    required: true,
    default: true,
  },
  executionTime: {
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  startTime: { 
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  speed: {
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  averageTime: {
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  guarantee: {
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  quality: {
    type: String,
    required: true,
    default: 'لا تتوفر لدينا معلومات كافية',
  },
  max: {
    type: String,
    required: true,
  },
  dripfeed: {
    type: Boolean,
    required: true,
    default: false
  },
  average_time: String,
  total_votes: String,
  start_time: String,
  note: String,
  example_link: String,
  refill: {
    type: {
      type: String,
      default: 'manual',
    },
    status: {
      type: Boolean,
      require: true,
    },
    days: {
      type: String,
      required: true,
      default: '2'
    }
  },
  linkDuplicates: Boolean,
  statusServiceProvider: Boolean,
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const Services = mongoose.model('Services', servicesSchema);
module.exports = Services;
