// src/App.jsx
import React, { useState, useEffect } from 'react';

const students = [
  { id: '652f1a2b3c4d5e6f7g8h9i0j', name: 'Alice Johnson' },
  { id: '652f1a2b3c4d5e6f7g8h9i1k', name: 'Bob Smith' },
  { id: '652f1a2b3c4d5e6f7g8h9i2l', name: 'Chinedu Okoro' },
];

export default function StudentAttendance() {
  const [date, setDate] = useState('');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [session, setSession] = useState('morning');
  const [currentClass, setCurrentClass] = useState('JSS1');
  const [records, setRecords] = useState(
    students.map(student => ({
      studentId: student.id,
      status: 'present',
      reason: ''
    }))
  );


    // Load students from backend
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch(`https://students-teachers-management-eta.vercel.app/getStudentsByClass?currentClass=${currentClass}`);
        const data = await res.json();
        setStudents(data);
        setRecords(data.map(student => ({
          studentId: student._id,
          status: 'present',
          reason: ''
        })));
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [students]);

  const handleStatusChange = (index, value) => {
    const updated = [...records];
    updated[index].status = value;
    if (value === 'present') updated[index].reason = '';
    setRecords(updated);
  };

  const handleReasonChange = (index, value) => {
    const updated = [...records];
    updated[index].reason = value;
    setRecords(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date,
      session,
      records
    };

    const res = await fetch('https://students-teachers-management-eta.vercel.app/markAttendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    alert(result.message || result.error);
  };

  return (
    <div className="min-h-screen bg-inherit p-6">
      <div className="max-w-4xl mx-auto bg-inherit p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-white">Student Attendance</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="border p-2 rounded w-1/3 bg-inherit text-white"
            />
            <select
              value={session}
              onChange={e => setSession(e.target.value)}
              required
              className="border p-2 rounded w-1/3 bg-inherit text-white"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>


            <select
              value={currentClass}
              onChange={e => setCurrentClass(e.target.value)}
              required
              className="border p-2 rounded w-1/3 bg-inherit text-white"
            >
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
              <option value="JSS3">JSS3</option>
              <option value="SSS1">SSS1</option>
              <option value="SSS2">SSS2</option>
              <option value="SSS3">SSS3</option>
            </select>
          </div>

          {students.map((student, index) => (
            <div key={student.id} className="border p-4 rounded space-y-2">
              <h2 className="font-semibold text-white">{student.name}</h2>
              <select
                value={records[index].status}
                onChange={e => handleStatusChange(index, e.target.value)}
                className="border p-2 rounded w-full bg-inherit text-blue-600"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="excused">Excused</option>
              </select>
              {(records[index].status === 'absent' || records[index].status === 'excused') && (
                <input
                  type="text"
                  value={records[index].reason}
                  onChange={e => handleReasonChange(index, e.target.value)}
                  placeholder="Reason (optional)"
                  className="border p-2 rounded w-full"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
}
