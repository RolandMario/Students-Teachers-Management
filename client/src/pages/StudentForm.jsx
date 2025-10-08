// src/StudentForm.jsx
import React, { useState } from 'react';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    class: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/registerStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Student registered successfully!');
        setFormData({ name: '', studentId: '', class: '' });
      } else {
        setMessage(result.error || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error.');
    }
  };

  return (
    <div className="min-h-screen bg-inherit p-6 flex items-center justify-center">
      <div className=" bg-inherit p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Student Enrollment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Student ID"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="Class (e.g. Grade 10)"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register Student
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
