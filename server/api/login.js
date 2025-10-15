

const mongoose = require('mongoose');
const AdminLogin = require('../models/admin_login')

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

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
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
