// /api/submit-assessments.js
import mongoose from 'mongoose';
import Assessment from '../models/Assessment.js'; // Uncomment when needed

let isConnected = false;
const uri = process.env.DB_URL;

export default async function handler(req, res) {

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
    return res.status(400).json({ error: 'Method not allowed' });
  }

  try {
    if (!isConnected) {
      await mongoose.connect(uri);
      isConnected = true;
    }
    const { class: className, subject, assessments, term } = req.body;

    if (!className || !subject || !Array.isArray(assessments)) {
      console.log('Invalid payload')
      return res.status(400).json({ error: 'Invalid payload' });
      
    }

    const docs = assessments.map(a => ({
      student: a.studentId,
      class: className,
      subject,
      term,
      test1: a.test1,
      test2: a.test2,
      exam: a.exam
    }));

    await Assessment.insertMany(docs);
    console.log('Assessments saved successfully')
    res.status(200).json({ message: 'Assessments saved successfully', count: docs.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('An error occured', error)
  }
}
