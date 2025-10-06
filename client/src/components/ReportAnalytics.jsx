import React from 'react';
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
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Attendance Rate (%)',
      data: [92, 88, 95, 90, 85],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true
    }]
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

  return (
    <div className='flex-col'>
        <section className=' grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6'>
        <StatCard title={"Total Students"} value={100}/>
        <StatCard title={"Active Courses"} value={10}/>
        <StatCard title={"Avg Attendance"} value={"60%"}/> 
        <StatCard title={"Total Records"} value={50}/>    
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
        <Line data={attendanceData} options={{ responsive: true }} />
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

