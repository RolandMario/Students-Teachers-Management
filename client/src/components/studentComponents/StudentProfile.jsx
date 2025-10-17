export default function StudentProfile({ name='', studentId='', selectedClass='', phone='' }) {
  return (
    <div className="flex  gap-4 mb-6">
      <img src={"/logo192.png"} alt="Student" className="w-20 h-20 rounded-full object-cover" />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p>ID: {studentId}</p>
        <p>Class: {selectedClass}</p>
        <p>Tel: {phone}</p>
      </div>
    </div>
  );
}
