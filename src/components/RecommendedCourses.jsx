import React from "react";

const RecommendedCourses = () => {
  const courses = ["React Basics", "Advanced JavaScript", "Python for AI"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
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
