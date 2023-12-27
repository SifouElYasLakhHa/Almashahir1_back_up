const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const { Schema } = mongoose;

const usersSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  addBy: {
    type: {
      type: Number,
      required: true,
      default: 2, // 0 admin, 1 superVisor, 2 him self.
    },
    by: {
      type: String,
      required: true,
      default: 'register',
    },
  },
  token: {
    type: Schema.Types.ObjectId,
    ref: 'OAuthTokens',
  },
  role: {
    type: Number,
    required: true,
    default: 3,
  },
  status: {
    type: Number,
    default: 1, // 1 Active, 2 Unconfirmed, 3 Pending. 4 Close.
  },
  avatar: {
    type: String,
    default: '/style/images/default_avatar.png',
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 1
  },
  lang: {
    type: String,
    enum: ['en', 'ar'],
    default: 'ar'
  },
  balance: {
    total: {
      type: Number,
      default: 0, // will change it :( when site is done forget it for no fake mohammed :( hhhhhhhhhhhhhhhhhhhhhhhh :v :v :v :V :V
    },
    spent: {
      type: Number,
      default: 0,
    },
  },
  suspend: [{
    status: {
      type: Number,
      default: 1, // 1 active, 2 panding, 3 close.
    },
    message: String,
    degreeDanger: String,
    solutions: String,
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  activationEmail: {
    type: String,
    required: true,
    default: uuidv4(),
  },
  resetPassword: String,
  apiKey: String,
  description: String,
  jobTitle: String,
  country: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: String,
  firstName: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    value: {
      type: String,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'CodeCounties',
    },
  },
  points: {
    type: Number,
    default: 0,
  },
  settings: {
    dark: {
      type: Boolean,
      default: true,
    },
  },
  affiliate: String,
  visits: {
    type: Number,
    default: 0
  },
  affiliateSuccessful: {
    type: Number,
    default: 0
  },
  affiliateRegistration: {
    type: Number,
    default: 0
  },
  affiliateBy: String,
  rate: {
    type: Number,
    default: 0
  },
  ip: String,
  earnStatus: {
    type: Boolean,
    default: false
  },
  earnMoney: {
    balance: {
      type: Number,
      default: 0
    },
    payed: {
      type: Number,
      default: 0
    },
  }
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
