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
      console.log("execution...")
      try {
        const res = await fetch(`https://students-teachers-management-eta.vercel.app/getAllAttendanceRecords`);
        const data = await res.json();
        console.log(data)
        setStudentsRecords(data);
 
            } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        console.log("This is finally block in try-catch...")
      }
    }
    fetchStudentsAttendanceRecords();
  }, []);

  useEffect(() => {
  if (studentsRecords.length > 0) {
    const uniqueStudentIds = new Set(
      studentsRecords.map(record => record.student._id || record.student)
    );
    setTotalStudents(uniqueStudentIds.size);
  }
}, [studentsRecords]);

// Step 1: Normalize date and group counts
const dateMap = {};

studentsRecords.forEach(record => {
  const dateStr = record.date.slice(0, 10); // YYYY-MM-DD
  const key = dateStr;

  if (!dateMap[key]) {
    dateMap[key] = { present: 0, absent: 0, excused: 0 };
  }

  if (record.status === 'present') dateMap[key].present++;
  else if (record.status === 'absent') dateMap[key].absent++;
  else if (record.status === 'excused') dateMap[key].excused++;
});

// Step 2: Format for Chart.js
const data = {
  labels: Object.keys(dateMap).map(dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g. "Oct 8"
  }),
  datasets: [
    {
      label: 'Present',
      data: Object.values(dateMap).map(d => d.present),
      borderColor: '#4ade80',
      backgroundColor: '#4ade80',
      tension: 0.4
    },
    {
      label: 'Absent',
      data: Object.values(dateMap).map(d => d.absent),
      borderColor: '#f87171',
      backgroundColor: '#f87171',
      tension: 0.4
    },
    {
      label: 'Excused',
      data: Object.values(dateMap).map(d => d.excused),
      borderColor: '#60a5fa',
      backgroundColor: '#60a5fa',
      tension: 0.4
    }
  ]
};
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
        <Line data={data} options={options} />
        
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

