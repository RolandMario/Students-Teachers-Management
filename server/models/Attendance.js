// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student:
   {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Student',
      required: true
     },
  date: { 
    type: Date, 
    required: true
   },
  session: {
     type: String,
     enum: ['morning', 'afternoon'],
     required: true
     },
  status: {
     type: String,
      enum: ['present', 'absent', 'excused'],
      required: true
       },
  reason: {
     type: String 
    }, // Optional reason for absent or excused
}, {
  timestamps: true
});

attendanceSchema.index({ student: 1, date: 1, session: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
