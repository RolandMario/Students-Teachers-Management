export default function StudentProfile({ student }) {
  return (
    <div className="flex  gap-4 mb-6">
      <img src={"/logo192.png"} alt="Student" className="w-20 h-20 rounded-full object-cover" />
      <div>
        <h2 className="text-xl font-bold">{student.name}</h2>
        <p>ID: {student.studentId}</p>
        <p>Class: {student.class}</p>
        <p>Term: {student.term}</p>
      </div>
    </div>
  );
}
