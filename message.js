const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  content: String,
  author: String,
  id_msg: Number
});
module.exports = messageModel = mongoose.model('message', messageSchema)