const moment = require('moment');
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  status: {
    type: String,
    enum: ['application', 'proceeding', 'complete', 'cancel'],
    required: true,
    default: 'application',
  },
  register_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
    required: true,
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatRoom',
  },
  // video: {}
  point: {
    type: Number,
    default: 0,
    required: true,
  },
  reviewerComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  applicantComplete: {
    type: Boolean,
    default: false,
    required: true,
  },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'review' },
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = { Application };
