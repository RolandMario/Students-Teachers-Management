const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  description: String
  // Add other fields if needed
});

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
