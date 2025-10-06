import React, { useState } from 'react';
import StudentCard from '../components/StudentCard';
import SearchBar from '../components/SearchBar';
import TeachersRecords from '../components/TeachersRecords';

const TeachersManagement = () => {
const [isOpen, setIsOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1)
const TRANSACTIONS_PER_PAGE = 10;


    const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };


  const student_details =[
{
  name:"Roland",
  email: "rolandmario2@gmail.com",
  phone: "07068497568",
  current_class: "JSS1",
  subjects: "Mathematics"
},
{
  name:"Julius",
  email: "juliusedachi@gmail.com",
  phone: "07068497568",
  current_class: "SSS1",
  subjects: "Coding"
},
{
  name:"Roland",
  email: "rolandmario2@gmail.com",
  phone: "07068497568",
  current_class: "JSS1",
  subjects: "English"
},
{
  name:"Julius",
  email: "juliusedachi@gmail.com",
  phone: "07068497568",
  current_class: "SSS1",
  subjects: "ICT"
}

  ].slice(    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE)

   const totalPages = Math.ceil(student_details.length / TRANSACTIONS_PER_PAGE);

  return (
    <div className=" text-white w-full md:w-full p-4">
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
            <div>
              <h1 className=' font-bold size-30'>Teachers Management</h1>
              {/* <p>View and manage student enrollments and performance</p> */}
            </div>
            <div className=' sm:justify-self-end'>
              <button className=' bg-indigo-500 p-2 text-white rounded-sm '>Enroll Student</button>
            </div>
      </section>
    <div className=" flex items-center justify-center">
      <SearchBar onSearch={handleSearch} />
    </div>
         {student_details.map((item, index) => (
        <TeachersRecords key={index} name={item.name} email={item.email} phone={item.phone} subjects={item.subjects} current_class={item.current_class} />
      ))}

       <div className=' flex justify-evenly py-6'>
          <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          
          >Prev</button>

          <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          
          
          >Next</button>
       </div>
      </div>
     
  );
};

export default TeachersManagement;
