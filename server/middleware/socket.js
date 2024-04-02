const { User } = require("../models/user");
const { Chat } = require("../models/chat");
const { ChatRoom } = require("../models/chatRoom");
const { Alarm, AlarmText } = require("../models/alarm");
let socketModule = module.exports;

module.exports.ioModule = (io) => {
    return io;
};
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("init", (roomId, cb) => {
            ChatRoom.findById(roomId)
                .populate("chats")
                .then((room) => {
                    if (!room) {
                        cb({
                            success: false,
                            msg: "채팅방을 찾을 수 없습니다.",
                        });
                    } else {
                        cb({ success: true, msg: room });
                    }
                })
                .catch((err) => {
                    cb({ success: true, msg: e.msg });
                });
        });
        socket.on("chat message", (msg, cb) => {
            const { roomId, author, message, userName } = msg;

            const newChat = new Chat({
                roomId,
                user: author,
                message,
                userName,
            });

            newChat
                .save()
                .then(() => {
                    ChatRoom.findByIdAndUpdate(roomId, {
                        $push: {
                            chats: newChat._id,
                        },
                    })
                        .populate("chats")
                        .then((room) => {
                            ChatRoom.findById(roomId)
                                .populate("chats")
                                .populate("users")
                                .then(async (findRes) => {
                                    const receiveUser = findRes["users"].filter(
                                        (user) => !user._id.equals(author),
                                    );

                                    const authorUser = await getUser(author);
                                    let content = AlarmText["chat"](
                                        authorUser.nickname,
                                        message,
                                    );

                                    notificationSave(
                                        io,
                                        cb,
                                        receiveUser[0]._id,
                                        content,
                                    );

                                    io.emit("chat message", findRes.chats);
                                    cb({ success: true, msg: findRes.chats });
                                });
                        })
                        .catch((e) => {
                            cb({ success: false, msg: e.msg });
                        });
                })
                .catch((e) => {
                    cb({ success: false, msg: e.msg });
                });
        });
        socket.on("notification", (msg, cb) => {
            const { userId, content } = msg;

            notificationSave(io, cb, userId, content);
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return io;
};

const notificationSave = (io, cb, creator, content) => {
    if (!io) io = module.exports.ioModule;

    const newAlarm = new Alarm({
        creator: creator,
        content: content,
    });

    newAlarm
        .save()
        .then((alarm) => {
            try {
                io.emit("notification", { status: true, userId: creator });
            } catch (err) {
                console.log(err);
            }
        })
        .catch((err) => {
            cb.status
                ? res.status(400).json({
                      status: false,
                      msg: err.msg,
                  })
                : cb({ success: false, msg: err._message });
        });
};

const getUser = async (id) => {
    try {
        const res = await User.findOne({ _id: id });
        console.log(res, " : res");
        return res;
    } catch (err) {
        console.log("get User API Error >>>> ", err);
    }
};

module.exports.socketModule = socketModule;
module.exports.notiSave = notificationSave;
