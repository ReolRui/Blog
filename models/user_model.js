const mongoose = require('mongoose')
const db = require('./db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  passwd: {
    type: String,
  },
  email: {
    type: String,
  },
  code: {
    type: Number,
  }
});

module.exports = mongoose.model('user', UserSchema);