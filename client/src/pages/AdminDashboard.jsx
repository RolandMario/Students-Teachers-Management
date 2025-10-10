//import React from 'react';
import { useState } from 'react';

import Sidebar from '../components/Sidebar';

import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (

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
