const moment = require('moment');
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
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
});

const Application = mongoose.model('application', ApplicationSchema);

module.exports = { Application };
