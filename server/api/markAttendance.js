// api/markAttendance.js
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

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

  if (req.method !== 'POST') return res.status(405).end();

  const { date, session, records, term, currentClass } = req.body;

  if (!date || !session || !Array.isArray(records) || !term || !currentClass) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await mongoose.connect(uri);

    const attendanceDate = new Date(date);
    const bulkOps = records.map(({ studentId, status, reason }) => ({
      updateOne: {
        filter: {
          student: studentId,
          date: attendanceDate,
          session,
          term,
          class: currentClass
        },
        update: {
          $set: {
            status,
            reason: status !== 'present' ? reason : undefined
          }
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
