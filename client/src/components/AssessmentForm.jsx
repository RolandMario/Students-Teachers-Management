// src/components/AssessmentForm.jsx
import React, { useState, useEffect } from 'react';

const AssessmentForm = () => {
  const [classes, setClasses] = useState(['JSS1', 'JSS2', 'JSS3']);
  const [subjects, setSubjects] = useState(['Math', 'English', 'Biology']);
  const [term, setTerm] = useState(['first_term', 'second_term', 'third_term']);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
        async function fetchStudents() {
          try {
                if (selectedClass && selectedSubject) {
      // Simulate fetch

      const res = await fetch(`https://students-teachers-management-eta.vercel.app/getStudentsByClass?currentClass=${selectedClass}`);
      const data = await res.json();
      console.log('json from backend', data)
      setStudents(data);
      console.log('fetched students', students)
      const initialScores = {};
      data.forEach(s => {
        console.log('checking id', s._id)
        initialScores[s._id] = { test1: '', test2: '', exam: '' };
      });
      setScores(initialScores);
    }
          } catch (error) {
              console.error('Failed to load students:', error);

          }
        }
        fetchStudents();

  }, [selectedClass, selectedSubject]);

  const handleScoreChange = (studentId, field, value) => {
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

const handleSubmit = async () => {
  console.log('executing submission...')
  const payload = {
    class: selectedClass,
    subject: selectedSubject,
    term: selectedTerm,
    assessments: Object.entries(scores).map(([studentId, scoreSet]) => ({
      studentId,
      test1: Number(scoreSet.test1),
      test2: Number(scoreSet.test2),
      exam: Number(scoreSet.exam)
    }))
  };

  try {
    console.log('payload ', payload)
    const res = await fetch('https://students-teachers-management-eta.vercel.app/submitAssessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error('Failed to submit assessments');
    }

    const result = await res.json();
    console.log('✅ Submission successful:', result);
    alert('Scores submitted successfully!');
  } catch (error) {
    console.error('❌ Error submitting scores:', error);
    alert('Failed to submit scores. Please try again.');
  }
};


  return (
    <div className="max-w-5xl mx-auto p-6 bg-inherit rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-white">📘 Enter Student Assessments</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-inherit">
        <select
          className="border p-2 rounded bg-inherit text-white"
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option  key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded bg-inherit text-white"
          value={selectedSubject}
          onChange={e => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded bg-inherit text-white"
          value={selectedTerm}
          onChange={e => setSelectedTerm(e.target.value)}
        >
          <option value="">Select Term</option>
          {term.map(trm => (
            <option key={trm} value={trm}>{trm}</option>
          ))}
        </select>
      </div>

      {students.length > 0 && (
        
        <div className="overflow-x-auto">
          <table className="min-w-full border mt-4">
            <thead className="bg-gray-100 bg-inherit text-white">
              <tr>
                <th className="p-2 text-left">Student</th>
                <th className="p-2 text-center">Test 1</th>
                <th className="p-2 text-center">Test 2</th>
                <th className="p-2 text-center">Exam</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id} className="border-t">
                  <td className="p-2 bg-inherit text-white">{student.name}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      className="w-16 border rounded p-1 text-center"
                      value={scores[student._id]?.test1 || ''}
                      onChange={e => handleScoreChange(student._id, 'test1', e.target.value)}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      className="w-16 border rounded p-1 text-center"
                      value={scores[student._id]?.test2 || ''}
                      onChange={e => handleScoreChange(student._id, 'test2', e.target.value)}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      className="w-16 border rounded p-1 text-center"
                      value={scores[student._id]?.exam || ''}
                      onChange={e => handleScoreChange(student._id, 'exam', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              {console.log('check students state', students)}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Scores
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentForm;
