const moment = require("moment");
const mongoose = require("mongoose");

const AlarmSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true,
    },
    content: {
        type: String,
    },
});

const Alarm = mongoose.model("alarm", AlarmSchema);

const AlarmText = {
    applicated: (user, title) =>
        `<b>${user}</b> 님이 <b>${title}</b> 리뷰를 신청하셨습니다.`,
    proceeded: (user, title) =>
        `<b>${user}</b> 님이 <b>${title}</b> 리뷰를 수락하셨습니다.`,
    canceled: (user, title) =>
        `<b>${user}</b> 님이 <b>${title}</b> 리뷰를 취소하셨습니다.`,
    copmpleted: (user, title) =>
        `<b>${user}</b> 님이 <b>${title}</b> 리뷰를 종료했습니다.`,
    chat: (user, message) =>
        `<b>${user}</b> 님이 메시지를 보냈습니다. <br />${user}: ${message}`,
};

module.exports = { Alarm, AlarmText };
