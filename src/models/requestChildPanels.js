const mongoose = require('mongoose');

const { Schema } = mongoose;
const requestChildPanelsSchema = new Schema({
    requestChildPanel: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    domain: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
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

const RequestChildPanels = mongoose.model('RequestChildPanels', requestChildPanelsSchema);
module.exports = RequestChildPanels;
