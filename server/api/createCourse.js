

const mongoose = require('mongoose');
const AdminLogin = require('../models/admin_login');
const Course = require('../models/Course');

let isConnected = false;
require('dotenv').config();
const uri = process.env.DB_URL
module.exports = async (req, res) => {
    console.log("Inside the api function...")
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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { courseName, courseCode, description } = req.body || {};

  if (!courseName) {
    return res.status(400).json({ message: 'course name is required' });
  }

  try {
    if (!isConnected) {
      await mongoose.connect(uri);
      isConnected = true;
    }

          const course = new Course({
            courseName,
            courseCode,
            description
          });
    
          await course.save();

          res.status(200).json({ message: 'Course saved successfully', course });
  } catch (err) {
    console.error('Mongoose error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
