import Student from '../models/Student';
import dbConnect from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { studentId, courses } = req.body;

    if (!studentId || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ error: 'Invalid request payload' });
    }

    // Update student's enrolledCourses
    const student = await Student.findOneAndUpdate(
      { studentId },
      { $addToSet: { enrolledCourses: { $each: courses } } }, // prevents duplicates
      { new: true }
    ).populate('enrolledCourses');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Student ${studentId} enrolled successfully`,
      student,
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
