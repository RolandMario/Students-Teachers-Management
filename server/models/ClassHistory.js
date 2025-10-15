// Class History Schema
const mongoose = require('mongoose');
const ClassHistorySchema = new mongoose.Schema({
  student:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Student',
      required: true
     },
  className: {
    type: String,
    required: true
  },
  academicYear: {
    type: String, // e.g., "2024/2025"
    required: true
  },
  promotedOn: {
    type: Date,
    default: Date.now
  }
});