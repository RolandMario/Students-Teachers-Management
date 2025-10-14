const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  type: {
    type: String,
    enum: ['first_test', 'second_test', 'exam'],
    required: true
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
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
