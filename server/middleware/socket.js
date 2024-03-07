const { ChatRoom } = require('../models/chatRoom');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');
    io.on('init', (reviewerId, applicantId, cb) => {
      console.log('reviewerId:::', reviewerId);
      console.log('applicantId:::', applicantId);

      ChatRoom.findOne({ users: [reviewerId, applicantId] })
        .then((room) => {
          if (!room) {
            let newRoom = new ChatRoom({
              users: [reviewerId, applicantId],
            });

            newRoom
              .save()
              .then((res) => {
                cb(true, '새로운 채팅방이 생성되었습니다.');
                // io.emit('init', {
                //   success: true,
                //   msg: '새로운 채팅방이 생성되었습니다.',
                // });
              })
              .catch((err) => {
                cb(false, '채팅방 생성에 실패했습니다.');
                // io.emit('init', {
                //   success: false,
                //   msg: '새로운 채팅방 생성에 실패했습니다.',
                // });
              });
          } else {
            // 이미 채팅방이 있으면
            // 해당 채팅방 정보들 그냥 싹 넘겨주는걸로
            cb(true, room.populate('chats'));
            // io.emit('init', { success: true, room: room.populate('chats') });
          }
        })
        .catch((err) => {
          res.status(400).json({ success: false, msg: e.msg });
        });
    });
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg.author, msg.message);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
