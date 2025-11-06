import { Link } from "react-router-dom"
import React, { useState } from 'react';
import CreateCourseModal from "../components/CreateCourseModal";
import { toast } from 'react-toastify';
const Courses = () => {

      const [showModal, setShowModal] = useState(false);
        const [courseName, setCourseName] = useState('');
        const [courseCode, setCourseCode] = useState('');
        const [description, setDescription] = useState('');

        const handleCreate = async() => {
            // Handle course creation logic

            const newCourse = { courseName, courseCode, description };
            const response = await fetch('https://students-teachers-management-eta.vercel.app/createCourse', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseName, courseCode, description }),
        });

              const data = await response.json();
                console.log(data)

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to create course');
                }
            console.log('new course:', newCourse)
            setShowModal(false);
            setCourseName('');
            setCourseCode('');
            setDescription('');
            setShowModal(true)
            toast.success('course created successfully');
    };

    return(
        <>
            <div className=" text-white w-full md:w-full p-4">
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 '>
            <div>
              <h1 className=' font-bold text-2xl'>Manage Courses</h1>
              <p>Create and manage your courses</p>
            </div>
            <div className=' sm:justify-self-end'>
              {/* <Link to='/admin-dashboard/student-enrollment' className=' bg-indigo-500 p-2 text-white rounded-sm font-bold '>+ create courses</Link> */}
     <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-700 text-white font-bold px-4 py-2 rounded"
      >
        + create course
      </button>

      <CreateCourseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
        courseName={courseName}
        setCourseName={setCourseName}
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        description={description}
        setDescription={setDescription}
      />
    </div>
            </div>
            <input type="text" placeholder=" search courses..." className=" bg-inherit border-2 rounded-md px-2 py-1"/>
      </section>
 


      </div>
        </>
    )
}
export default Courses