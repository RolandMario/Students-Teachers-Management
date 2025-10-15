// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  email: { 
    type: String,
     required: true 
    },
  phone: { 
    type: String,
     required: true 
    },
  studentId: {
     type: String,
    required: true,
     unique: true 
    },
    imageDriveId:{
      type: String
    },
    imageDriveUrl:{
      type: String,
    },
  class: {
     type: String,
     required: true
    
    },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    attendance:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }], 
    classHistory: [{type:mongoose.Schema.Types.ObjectId, ref: 'ClassHistory'}]
  // Add other fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
