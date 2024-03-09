const { Chat } = require('../models/chat');
const { ChatRoom } = require('../models/chatRoom');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('init', (roomId, cb) => {
      ChatRoom.findById(roomId)
        .populate('chats')
        .then((room) => {
          if (!room) {
            cb({ success: false, msg: '채팅방을 찾을 수 없습니다.' });
          } else {
            cb({ success: true, msg: room });
          }
        })
        .catch((err) => {
          cb({ success: true, msg: e.msg });
        });
    });
    socket.on('chat message', (msg, cb) => {
      const { roomId, author, message, userName } = msg;

      const newChat = new Chat({ roomId, user: author, message, userName });
      newChat
        .save()
        .then(() => {
          ChatRoom.findByIdAndUpdate(roomId, {
            $push: {
              chats: newChat._id,
            },
          })
            .then(() => {
              cb({ success: true, msg: 'Save Chat' });
            })
            .catch((e) => {
              cb({ success: false, msg: e.msg });
            });
        })
        .catch((e) => {
          cb({ success: false, msg: e.msg });
        });
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
