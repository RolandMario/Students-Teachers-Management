import React, { useState, useEffect } from 'react';

function CourseEnrollmentForm() {
  const [students, setStudents] = useState(['Roland', 'Julius']);
  const [filteredStudents, setFilteredStudents] = useState([{id: 'stu001', name:'Roland'}]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [courses, setCourses] = useState([{id:'math101', name:'Mathematics'}, {id:'Eng101', name:'English' }]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://students-teachers-management-eta.vercel.app/searchByName?name=${searchTerm}`);
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
        console.log('search result', data)
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [searchTerm]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://students-teachers-management-eta.vercel.app/fetchCourses');
        const data = await response.json();
        setCourses(data);
        console.log('fetched courses', data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const toggleCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      studentId: selectedStudentId,
      courses: selectedCourses,
    };

    try {
      const response = await fetch('https://students-teachers-management-eta.vercel.app/enrollCourses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      alert('Enrollment successful!');
    } catch (error) {
      alert('Enrollment failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-inherit p-6 rounded shadow-lg">
      <div className="mb-4">
        <label className="block text-white mb-1">Search Student</label>
        <input
          type="text"
          className="w-full bg-inherit text-white border-gray-300 rounded-md shadow-sm"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block bg-inherit text-white mb-1">Select Student</label>
        <select
          className="w-full bg-inherit text-white border-gray-300 rounded-md shadow-sm"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          required
        >
          <option value="">-- Choose a student --</option>
          {filteredStudents.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mb-4">
        <legend className="text-white font-semibold mb-2">Select Courses</legend>
        {courses.map((course) => (
          <label key={course.id} className="block mb-2 text-white">
            <input
              type="checkbox"
              value={course.id}
              checked={selectedCourses.includes(course.id)}
              onChange={() => toggleCourse(course.id)}
              className="mr-2 text-white"
            />
            {course.name}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enroll
      </button>
    </form>
  );
}

export default CourseEnrollmentForm;
