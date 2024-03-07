const mongoose = require('mongoose');
const moment = require('moment');
require('./chat');

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const ChatRoomSchema = new Schema({
  users: [
    {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
  ],
  chats: [{ type: ObjectId, ref: 'chat' }],
  createdAt: {
    type: Date,
    required: true,
    default: moment().format('MMMM DD, YYYY'),
  },
});

const ChatRoom = mongoose.model('chatRoom', ChatRoomSchema);

module.exports = { ChatRoom };
