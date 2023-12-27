const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
const favoritesCategoriesSchema = new Schema({
    favoritesCategories: {
        type: Number,
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
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const FavoritesCategories = mongoose.model('FavoritesCategories', favoritesCategoriesSchema);
module.exports = FavoritesCategories;
