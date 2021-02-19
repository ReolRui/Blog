const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const db = require('./db');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    author: String,
    category: String,
    title: String,
    content: String,
    create_at: Date,
    update_at: Date
});

module.exports = mongoose.model('article', ArticleSchema);