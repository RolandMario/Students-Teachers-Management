import React from 'react';
import { BookOpenIcon } from '@heroicons/react/outline'; // Requires @heroicons/react

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-700  shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{course.name}</h2>
          <p className="text-sm text-white">{course.code}</p>
        </div>
        <BookOpenIcon className="h-6 w-6 text-blue-600" />
      </div>

      <p className="text-white mb-4">{course.description}</p>

      <p className="text-sm text-white mb-6">
       <span className="font-medium">👨‍⚕️  {`${course.enrolledCount} students enrolled`}</span> 
      </p>

      <div className="flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Details
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Take Attendance
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
