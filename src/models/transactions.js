const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const transactionsSchema = new Schema({
  transaction: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'Payments',
  },
  type: {
    type: String,
    required: true,
    enum: ['api', 'manual'],
    default: 'api'
  },
  transactionId: {
    type: String,
    default: '',
  },
  userId: {
    /*type: String,
    default: '',*/
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  discount: {
    type: Number,
    default: 0,
  },
  transactionStatus: {
    type: String, // Failed , Succeeded, Processing
    default: ''
  },
  description: String,
  amount: {
    type: Number,
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
  customerDetails: {
    address: {
      city: {
        type: String, 
        default: ''
      },
      country: {
        type: String, 
        default: ''
      },
      line1: {
        type: String, 
        default: ''
      },
      line2: {
        type: String, 
        default: ''
      },
      postal_code: {
        type: String, 
        default: ''
      },
      state: {
        type: String, 
        default: ''
      },
    },
    name: {
      type: String, 
      default: ''
    },
    phone: {
      type: String, 
      default: ''
    },
    email: {
      type: String, 
      default: ''
    },
  },
  paymentMethodDetails: {
    type: {
      type: String, 
      default: ''
    },
    card:{
      brand: {
        type: String, 
        default: ''
      },
      country: {
        type: String, 
        default: ''
      },
      exp_month: {
        type: String, 
        default: ''
      },
      exp_year: {
        type: String, 
        default: ''
      },
      funding: {
        type: String, 
        default: ''
      },
      network: {
        type: String, 
        default: ''
      },
      three_d_secure: {
        type: String, 
        default: ''
      },
    },
  },
  amountRefunded: {
    type: Number, 
    default: ''
  },
  calculatedStatementDescriptor: {
    type: String, 
    default: ''
  },
  refunded: {
    type: Boolean, 
    default: false
  },
  receipt_url: {
    type: String, 
    default: ''
  },
  currency: {
    type: String, 
    default: ''
  },
});

const Transactions = mongoose.model('Transactions', transactionsSchema);
module.exports = Transactions;
