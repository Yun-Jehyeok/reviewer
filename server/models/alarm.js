const moment = require('moment');
const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  register_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
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

const Alarm = mongoose.model('alarm', AlarmSchema);

module.exports = { Alarm };
