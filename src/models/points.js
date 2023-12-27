const mongoose = require('mongoose');

const { Schema } = mongoose;
const pointsSchema = new Schema({
    point: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    spentCount: {
        type: Number,
        default: 0
    },
    orderIds: [Number],
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const Points = mongoose.model('Points', pointsSchema);
module.exports = Points;
