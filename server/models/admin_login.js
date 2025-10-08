const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
  email: String,
  password: String,
  // Add other fields if needed
});

module.exports = mongoose.models.AdminLogin || mongoose.model('AdminLogin', adminLoginSchema);
