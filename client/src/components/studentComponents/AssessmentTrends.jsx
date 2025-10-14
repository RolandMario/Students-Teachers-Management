import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AssessmentTrends({ assessments }) {
  const data = assessments.map(a => ({
    subject: a.subject,
    type: a.type,
    score: a.score
  }));

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Test & Exam Trends</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
