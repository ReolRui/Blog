const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDb', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.once('open', () => {
    console.log('连接成功');
});
db.once('close', () => {
    console.log('断开连接');
})

module.exports = db

