import React, { useState } from 'react';
import { useEffect } from 'react';

import {
  Bar,
  Line,
  Doughnut
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import StatCard from './StatCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ReportAnalytics = () => {

  const [studentsRecords, setStudentsRecords] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0)
  // Sample Data
  const performanceData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [{
      label: 'Average Grade (%)',
      data: [78, 85, 72, 90, 65],
      backgroundColor: 'rgba(59, 130, 246, 0.6)'
    }]
  };

const attendanceData = {
  labels: ['Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5'],
  datasets: [
    {
      label: 'Present',
      data: [25, 28, 22, 30, 27],
      borderColor: '#4ade80',
      backgroundColor: '#4ade80',
      tension: 0.4
    },
    {
      label: 'Absent',
      data: [5, 3, 6, 2, 4],
      borderColor: '#f87171',
      backgroundColor: '#f87171',
      tension: 0.4
    },
    {
      label: 'Excused',
      data: [2, 1, 4, 0, 1],
      borderColor: '#60a5fa',
      backgroundColor: '#60a5fa',
      tension: 0.4
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Attendance Overview' }
  }
};



  const teacherEngagementData = {
    labels: ['Assignments', 'Feedback', 'Meetings', 'Messages'],
    datasets: [{
      label: 'Engagement',
      data: [30, 45, 20, 50],
      backgroundColor: [
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#ef4444'
      ]
    }]
  };

    useEffect(() => {
    async function fetchStudentsAttendanceRecords() {
      try {
        const res = await fetch(`https://students-teachers-management-eta.vercel.app/getAllAttendanceRecords`);
        const data = await res.json();
        setStudentsRecords(data);
        const uniqueStudentIds = new Set(studentsRecords.map(record => record.student));
        setTotalStudents(uniqueStudentIds.size);
            } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        console.log("This is finally block in try-catch...")
      }
    }
    fetchStudentsAttendanceRecords();
  }, [totalStudents]);

  return (
    <div className='flex-col'>
        <section className=' grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6'>
        <StatCard title={"Total Students"} value={totalStudents}/>
        <StatCard title={"Active Courses"} value={10}/>
        <StatCard title={"Avg Attendance"} value={"60%"}/> 
        <StatCard title={"Total Teachers"} value={50}/>    
        </section>

    <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* <h2 className="text-2xl font-bold text-gray-800">📊 Reports & Analytics</h2> */}
        
      {/* Student Performance */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Student Performance</h3>
        <Bar data={performanceData} options={{ responsive: true }} />
      </div>

      {/* Attendance Trends */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Attendance Trends</h3>
        <Line data={attendanceData} options={options} />
        
      </div>


      {/* Teacher Engagement */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Teacher Engagement</h3>
        <Doughnut data={teacherEngagementData} options={{ responsive: true }} />
      </div>
    </div>
    </div>
  );
};

export default ReportAnalytics;

