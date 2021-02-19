const mongoose = require('mongoose')
const db = require('./db');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
});

module.exports = mongoose.model('category', CategorySchema);