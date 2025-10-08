// api/registerStudent.js
const mongoose = require('mongoose');
const Student = require('../models/Student');
const uri = 'mongodb+srv://rolandmario2_db_user:eVwzrtbJIc73x14Q@cluster-1.ivdkyjp.mongodb.net/Stu_Tea?retryWrites=true&w=majority&appName=Cluster-1'


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
  if (req.method !== 'POST') return res.status(405).end();

  const { name, studentId, class: studentClass } = req.body;

  if (!name || !studentId) {
    return res.status(400).json({ error: 'Name and Student ID are required' });
  }

  try {
    await mongoose.connect(uri);
    const student = new Student({ name, studentId, class: studentClass });
    await student.save();
    res.status(200).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
