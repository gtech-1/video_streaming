import React from "react";

const RecommendedCourses = () => {
  const courses = ["React Basics", "Advanced JavaScript", "Python for AI"];

  return (
    // <div className="bg-white p-4 rounded-lg shadow">
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Indigo animated border */}
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
      <h2 className="text-xl font-bold mb-3">📖 Recommended Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index} className="p-2 border-b">{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedCourses;
