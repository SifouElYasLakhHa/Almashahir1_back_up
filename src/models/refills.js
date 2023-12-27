const mongoose = require('mongoose');

const { Schema } = mongoose;
const refillsSchema = new Schema({
    refill: {
        type: Number,
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    refillId: String,
    status: {
        type: String,
        required: true,
        default: 'Processing'
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

const Refills = mongoose.model('Refills', refillsSchema);
module.exports = Refills;
