import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SubjectScoresChart({ assessments }) {
  const subjects = [...new Set(assessments.map(a => a.subject))];
  const data = subjects.map(subject => {
    const scores = assessments.filter(a => a.subject === subject);
    return {
      subject,
      test: scores.filter(a => a.type.includes('test')).reduce((s, a) => s + a.score, 0),
      exam: scores.filter(a => a.type === 'exam').reduce((s, a) => s + a.score, 0)
    };
  });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Subject Scores</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="test" fill="#f59e0b" />
          <Bar dataKey="exam" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
