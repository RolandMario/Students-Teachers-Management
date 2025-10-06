//import React from 'react';
import { useState } from 'react';
import StatCard from '../components/StatCard';
import ManageUser from '../components/ManageUser';
import NotificationCard from '../components/NotificationCard';
import Sidebar from '../components/Sidebar';
import ReportAnalytics from '../components/ReportAnalytics';
import Header from '../components/Header';
import {Router, Routes, Route, Outlet } from 'react-router-dom';

const AdminDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    // <div className="min-h-screen bg-gray-100 p-4 flex">
    //   {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1> */}
    //   <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
    //   <section>
    //   {/* User Statistics */}
    //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    //     <StatCard title="Total Users" value="1,245" />
    //     <StatCard title="Active Classes" value="58" />
    //     <StatCard title="Pending Reports" value="12" />
    //   </div>

    //   {/* Class Management & Reports */}
    //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    //     <div className="bg-white p-4 rounded-lg shadow">
    //       <h2 className="text-lg font-semibold mb-4">Class Management</h2>
    //       <ul className="space-y-2">
    //         <li className="flex justify-between border-b pb-2">
    //           <span>Math 101</span>
    //           <button className="text-blue-500 hover:underline">Edit</button>
    //         </li>
    //         <li className="flex justify-between border-b pb-2">
    //           <span>Biology 202</span>
    //           <button className="text-blue-500 hover:underline">Edit</button>
    //         </li>
    //         <li className="flex justify-between border-b pb-2">
    //           <span>History 303</span>
    //           <button className="text-blue-500 hover:underline">Edit</button>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="bg-white p-4 rounded-lg shadow">
    //       <h2 className="text-lg font-semibold mb-4">Reports & Analytics</h2>
    //       <p className="text-sm text-gray-600">User engagement is up 12% this week. Most active class: Math 101.</p>
    //       <div className="mt-4">
    //         <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">View Full Report</button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Notifications */}
    //   <div className="mb-6">
    //     <h2 className="text-lg font-semibold mb-4">Notifications</h2>
    //     <div className="space-y-2">
    //       <NotificationCard message="New user registered: Jane Doe" />
    //       <NotificationCard message="Assignment overdue in Biology 202" />
    //       <NotificationCard message="System update scheduled for Friday" />
    //     </div>
    //   </div>

    //   {/* Quick Links */}
    //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    //     <ManageUser label="Add User" icon="👤" />
    //     <ManageUser label="Manage Course" icon="📚" />
    //     <ManageUser label="View Logs" icon="📝" />
    //   </div>
    //   </section>
    // </div>
        // <Router>
      <div className="flex flex-col md:flex-row bg-slate-700 ">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar />
        <main className="flex-1 p-4 md:ml-5 mt-20 md:mt-0">
                {/* <main className="flex-1 p-4 md:ml-64 mt-16 md:mt-0 bg-gray-100"> */}
        <Outlet/>
      {/* </main> */}
        </main>
      </div>
    // </Router>
  );
};

export default AdminDashboard;
