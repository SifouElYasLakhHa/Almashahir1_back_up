const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const favoritesSchema = new Schema({
    favorite: {
        type: Number,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
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

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;
