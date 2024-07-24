const moment = require("moment");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    grade: {
        type: String,
        required: true,
        enum: ["Lv1", "Lv2", "Lv3"],
        default: "Lv1",
    },
    point: {
        type: Number,
        required: true,
        default: 0,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    login_way: {
        type: String,
        required: true,
        default: "email",
    },
    isReviewer: {
        type: Boolean,
        required: true,
        default: false,
    },
    lang: [
        {
            type: String,
            required: true,
            default: "Python",
        },
    ],
    profile_img: {
        type: String,
        required: true,
        default: "https://dummyimage.com/100",
    },
    register_date: {
        type: Date,
        default: moment().format("MMMM DD, YYYY"),
        required: true,
    },
    reputation: {
        type: Number,
        required: true,
        default: 0,
    },
    isSubmit: {
        type: Boolean,
        required: true,
        default: false,
    },
    oneLineIntroduce: {
        type: String,
        default: "",
    },
    introduce: {
        type: String,
        default: "",
    },
    getApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    alarms: [{ type: mongoose.Schema.Types.ObjectId, ref: "alarm" }],
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };
