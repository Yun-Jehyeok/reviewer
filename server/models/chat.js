const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const ChatSchema = new Schema({
  roomId: { type: String, required: true },
  user: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userName: { type: String, required: true },
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = { Chat };
