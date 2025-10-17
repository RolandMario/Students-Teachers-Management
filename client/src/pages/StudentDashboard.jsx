import { useEffect, useState } from 'react';
import { student as mockStudent } from '../components/studentComponents/data';
import Filters from '../components/studentComponents/Filters';
import StudentProfile from '../components/studentComponents/StudentProfile';
import AttendanceChart from '../components/studentComponents/AttendanceChart';
import AssessmentTrends from '../components/studentComponents/AssessmentTrends';
import SubjectScoresChart from '../components/studentComponents/SubjectScoresChart';
import AttendanceList from '../components/studentComponents/AttendanceList';
import AddAssessmentForm from '../components/studentComponents/AddAssessmentForm';

function App() {
  const [selectedTerm, setSelectedTerm] = useState(mockStudent.term);
  const [selectedClass, setSelectedClass] = useState(mockStudent.class);
  const [student, setStudent] = useState(mockStudent);
  
useEffect(()=>{
  async function fetchData() {
    try {
        const res = await fetch(`https://students-teachers-management-eta.vercel.app/getStudentRecordsById`);
        const data = await res.json();
        setStudent(data);
        console.log(data)
        console.log("students info fetched successfully")     
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
}, [])
  // Filtered data
  const filteredAssessments = student.assessments.filter(
    a => a.term === selectedTerm && student.class === selectedClass
  );
  const filteredAttendance = student.attendance.filter(
    a => student.class === selectedClass
  );

  // Add new assessment
  const handleAddAssessment = newRecord => {
    setStudent(prev => ({
      ...prev,
      assessments: [...prev.assessments, { ...newRecord, score: Number(newRecord.score), maxScore: Number(newRecord.maxScore) }]
    }));
  };

  // Averages
  const average = (type) => {
    const records = filteredAssessments.filter(a => a.type === type);
    return records.length ? (records.reduce((sum, a) => sum + a.score, 0) / records.length).toFixed(1) : 'N/A';
  };

  const averageAll = () => {
    const records = filteredAssessments;
    return records.length ? (records.reduce((sum, a) => sum + a.score, 0) / records.length).toFixed(1) : 'N/A';
  };

  const attendanceRate = () => {
    const present = filteredAttendance.filter(a => a.status === 'present').length;
    return filteredAttendance.length ? ((present / filteredAttendance.length) * 100).toFixed(1) + '%' : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-4">📘 Student Dashboard</h1>
        <div className="flex flex-wrap justify-between pr-10">

          <Filters
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />

        <StudentProfile student={student} />
        </div>


        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">📊 Averages</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Average Attendance:</strong> {attendanceRate()}</li>
              <li><strong>Average First Test Score:</strong> {average('first_test')}</li>
              <li><strong>Average Second Test Score:</strong> {average('second_test')}</li>
              <li><strong>Average Exam Score:</strong> {average('exam')}</li>
              <li><strong>Overall Assessment Average:</strong> {averageAll()}</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <AddAssessmentForm onAdd={handleAddAssessment} />
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttendanceChart attendance={filteredAttendance} />
          <AssessmentTrends assessments={filteredAssessments} />
        </div>

        <SubjectScoresChart assessments={filteredAssessments} />
        <AttendanceList attendance={filteredAttendance} />
      </div>
    </div>
  );
}

export default App;
