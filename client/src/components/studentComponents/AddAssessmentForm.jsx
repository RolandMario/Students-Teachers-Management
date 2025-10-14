import { useState } from 'react';

export default function AddAssessmentForm({ onAdd }) {
  const [form, setForm] = useState({
    subject: '', type: 'first_test', score: '', maxScore: '', term: 'first_term'
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(form);
    setForm({ subject: '', type: 'first_test', score: '', maxScore: '', term: 'first_term' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold">Add Assessment</h3>
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full p-2 border rounded" required />
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="first_test">First Test</option>
        <option value="second_test">Second Test</option>
        <option value="exam">Exam</option>
      </select>
      <input name="score" type="number" placeholder="Score" value={form.score} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="maxScore" type="number" placeholder="Max Score" value={form.maxScore} onChange={handleChange} className="w-full p-2 border"/>
      </form>
  )};