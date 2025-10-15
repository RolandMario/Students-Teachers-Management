const { google } = require('googleapis');
const multer = require('multer');
const mongoose = require('mongoose');
const Student = require('../models/Student'); // adjust path if needed
require('dotenv').config();
// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

// Google OAuth setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  upload.single('image')(req, res, async () => {
    try {
      const { name, email, phone, class: studentClass, studentId } = req.body;

      // Upload image to Google Drive
      const fileMetadata = {
        name: req.file.originalname,
        parents: ['your-folder-id'] // optional: replace with actual folder ID
      };

      const media = {
        mimeType: req.file.mimetype,
        body: Buffer.from(req.file.buffer)
      };

      const driveResponse = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });

      const fileId = driveResponse.data.id;
      const driveUrl = `https://drive.google.com/file/d/${fileId}/view`;

      // Save student data to MongoDB
      const student = new Student({
        name,
        email,
        phone,
        class: studentClass,
        studentId,
        imageDriveId: fileId,
        imageDriveUrl: driveUrl
      });

      await student.save();

      res.status(200).json({ message: 'Student saved successfully', student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload and save data' });
    }
  });
};
