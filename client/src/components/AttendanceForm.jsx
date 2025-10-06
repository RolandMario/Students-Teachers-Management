import React, { useState } from 'react';

const AttendanceForm = () => {
  const [date, setDate] = useState('');
  const [session, setSession] = useState('morning');
  const [students, setStudents] = useState([
    { id: 'stu001', name: 'Alice Johnson', present: false },
    { id: 'stu002', name: 'Bob Smith', present: false },
    { id: 'stu003', name: 'Charlie Lee', present: false },
    // Add more students as needed
  ]);

  const handleCheckboxChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendancePayload = {
      date,
      session,
      attendance: students.map((student) => ({
        studentId: student.id,
        present: student.present,
      })),
    };

    console.log('Attendance Payload:', attendancePayload);
    // You can send this payload to the backend using fetch or axios
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <section className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
        <div>
          <label className="block mb-1 font-medium text-blue-500">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-blue-500">Session</label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-blue-500">Class</label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="JSS1">JSS1</option>
            <option value="JSS2">JSS2</option>
            <option value="JSS3">JSS3</option>
            <option value="SSS1">SSS1</option>
            <option value="SSS2">SSS2</option>
            <option value="SSS3">SSS3</option>
          </select>
        </div>
        </section>
        <div>
          <label className="block mb-2 font-medium text-2xl text-blue-500">Students</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {students.map((student, index) => (
              <div key={student.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={() => handleCheckboxChange(index)}
                  className="h-4 w-4"
                />
                <span className=' text-white'>{student.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
