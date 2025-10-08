// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  studentId: {
     type: String,
    required: true,
     unique: true 
    },
  class: {
     type: String,
     required: true
    
    },
  // Add other fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
