// api/getStudents.js
const mongoose = require('mongoose');
const Student = require('../models/Student');
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

  const {currentClass} = req.query
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await mongoose.connect(uri);
    const students = await Student.find({class:currentClass});
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
