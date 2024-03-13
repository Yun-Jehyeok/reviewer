const moment = require('moment');
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  register_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = { Review };
