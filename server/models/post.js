const moment = require('moment');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    lang: [
        {
            type: String,
            required: true,
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    reputation: {
        type: Number,
        required: true,
        default: 0,
    },
    register_date: {
        type: Date,
        default: moment().format('MMMM DD, YYYY'),
        required: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
    imgs: [{ type: String }],
});

const Post = mongoose.model('post', PostSchema);

module.exports = { Post };
