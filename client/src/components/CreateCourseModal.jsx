
import React, { useState } from 'react';

const CreateCourseModal = ({ 
    isOpen, onClose, onCreate,
    courseName,
    setCourseName,
    courseCode,
    setCourseCode,
    description,
    setDescription,
}) => {
 
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Create New Course</h2>
        <form className="space-y-4 " onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
              className="mt-1 bg-inherit block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Code</label>
            <input
              type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="mt-1 bg-inherit block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
              className="mt-1 bg-inherit block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter course description"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Course
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
