const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  test1:{
    type: Number,
    default: 0
  },
  test2:{
    type: Number,
    default: 0
  },
  exam:{
    type: Number,
    default: 0
  },
  term: {
    type: String,
    enum: ['first_term', 'second_term', 'third_term'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  class:{
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String
  }
});

assessmentSchema.index({ student: 1, date: 1, test1: 1, test2: 1, exam:1 }, { unique: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
