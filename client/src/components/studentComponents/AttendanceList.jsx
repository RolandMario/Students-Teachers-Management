export default function AttendanceList({ attendance }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Recent Attendance</h3>
      <ul className="space-y-2">
        {attendance.map((a, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{a.date} ({a.session})</span>
            <span className={a.status === 'present' ? 'text-green-600' : a.status === 'excused' ? 'text-yellow-600' : 'text-red-600'}>
              {a.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
