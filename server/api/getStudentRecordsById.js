// api/getStudents.js
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Assessment = require('../models/Assessment')
require('dotenv').config();
const uri = process.env.DB_URL
module.exports = async (req, res) => {

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  // Main response headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const {email} = req.query
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await mongoose.connect(uri);
const student = await Student.findOne({ email}).lean(); // lean() returns a plain JS object
const attendance = await Attendance.find({ student: student._id }).lean();
const assessments = await Assessment.find({ student: student._id }).lean();



if (!student) {
  return res.status(404).json({ error: 'Student not found' });
}

// Merge attendance into student object
student.attendance = attendance;
student.assessments = assessments;

res.status(200).json(student);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};
