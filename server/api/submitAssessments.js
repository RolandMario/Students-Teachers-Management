// /api/submit-assessments.js
import mongoose from 'mongoose';
import Assessment from '../models/Assessment.js'; // Uncomment when needed

let isConnected = false;
const uri = process.env.DB_URL;

export default async function handler(req, res) {
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
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const docs = assessments.map(a => ({
      student: studentId,
      class: className,
      subject,
      term,
      test1: a.test1,
      test2: a.test2,
      exam: a.exam
    }));

    await Assessment.insertMany(docs);

    res.status(200).json({ message: 'Assessments saved successfully', count: docs.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
