export default function StudentProfile({ name='', studentId='', selectedClass='', phone='', photo }) {
  return (
    <div className="flex  gap-4 mb-6">
 <iframe
          src={`https://drive.google.com/file/d/${photo}/preview`}
          width="80"
          height="80"
          style={{ borderRadius: '50%' }}
          // allow="autoplay"
        />

      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p>ID: {studentId}</p>
        <p>Class: {selectedClass}</p>
        <p>Tel: {phone}</p>
      </div>
    </div>
  );
}
