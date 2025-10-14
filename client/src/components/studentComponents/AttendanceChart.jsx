// components/AttendancePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AttendanceChart({ attendance }) {
  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  const summary = ['present', 'absent', 'excused'].map((status, index) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: attendance.filter(a => a.status === status).length
  }));

  return (
    <div className="bg-inherit p-0  mb-6">
      <h3 className="text-lg font-semibold mb-4">Attendance Ratio</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={summary}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {summary.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
