import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import StudentCard from './StudentCard';
import { Link } from 'react-router-dom';

const StudentsMenu = () => {
const [students, setStudents] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const TRANSACTIONS_PER_PAGE = 3;

useEffect(()=>{
  async function fetchData() {
 try {
        const res = await fetch(`https://students-teachers-management-eta.vercel.app/fetchAllStudents`);
        const data = await res.json();
        setStudents(data);
        console.log("students info fetched successfully")
        
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
       // setLoading(false);
      }
}
fetchData();
},[])
    const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };
 return (
    <div className=" text-white w-full md:w-full p-4">
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
            <div>
              <h1 className=' font-bold size-30'>Student Management</h1>
              <p>View and manage student enrollments and performance</p>
            </div>
            <div className=' sm:justify-self-end'>
              <Link to='/admin-dashboard/student-enrollment' className=' bg-indigo-500 p-2 text-white rounded-sm '>Enroll Student</Link>
            </div>
      </section>
    <div className=" flex items-center justify-center">
      <SearchBar onSearch={handleSearch} />
    </div>
         {students.map((item, index) => (
        <StudentCard key={index} name={item.name} email={item.email} phone={item.phone} attendance={'null'} current_class={item.class} />
      ))}


      </div>
     
  );
};

export default StudentsMenu;
