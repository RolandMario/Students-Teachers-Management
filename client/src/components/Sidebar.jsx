import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={` min-h-screen fixed top-0 left-0 bg-gray-800 text-white w-64 h-full p-4 z-20 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard/reports" className="block hover:text-yellow-400" >📊 Dashboard</Link>
          <Link to="/admin-dashboard/student" className="block hover:text-yellow-400" >👨‍🎓 Student</Link>
           <Link to="/admin-dashboard/courses" className="block hover:text-yellow-400" >📘 My Courses</Link>
           <Link to="/admin-dashboard/teacher" className="block hover:text-yellow-400" >👨‍🏫 Teacher</Link>
           <Link to="/admin-dashboard/attendance" className="block hover:text-yellow-400" >📑 Attendance</Link>
           <Link to="/admin-dashboard/enrollment" className="block hover:text-yellow-400" >📑 Course Enrollment</Link>
          <Link to="/admin-dashboard/notifications" className="block hover:text-yellow-400" onClick={closeSidebar}>🔔 Notifications</Link>
          <Link to="/admin-dashboard/assessment" className="block hover:text-yellow-400" >📑 Assessments</Link>
       </nav> 

      </div>
    </>
  );
};

export default Sidebar;
