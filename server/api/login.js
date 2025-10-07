// /api/checkUser.js

const mongoose = require('mongoose');
const { default: AdminLogin } = require('../models/admin_login');

const uri = 'mongodb+srv://rolandmario2_db_user:eVwzrtbJIc73x14Q@cluster-1.ivdkyjp.mongodb.net/Stu_Tea?retryWrites=true&w=majority&appName=Cluster-1'


let isConnected = false;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  let body = {};

  try {
    body = req.body || JSON.parse(req.body); // Handles both parsed and raw JSON
  } catch (err) {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  const { email, password } = body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email parameter' });
  }

  try {
    if (!isConnected) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
    }

    const user = await AdminLogin.findOne({ email, password });

    if (user) {
      return res.status(200).json({ message: 'User found' });
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Mongoose error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
