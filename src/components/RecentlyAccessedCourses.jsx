
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const courses = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Alice Johnson",
    date: "Mar 10",
    time: "3h 45m",
    progress: 40,
    icon: "📂",
  },
  {
    id: 2,
    title: "Machine Learning",
    instructor: "Prof. David Kim",
    date: "Apr 5",
    time: "5h 15m",
    progress: 65,
    icon: "🤖",
  },
  {
    id: 3,
    title: "Cybersecurity Basics",
    instructor: "Dr. Emma Carter",
    date: "May 22",
    time: "4h 30m",
    progress: 85,
    icon: "🔐",
  },
];

const RecentlyAccessedCourses = () => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Courses</h2>
        <button className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-md hover:bg-gray-300 transition">
          Active ⌄
        </button>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 transition hover:shadow-md"
          >
            {/* Left Side: Icon + Details */}
            <div className="flex items-center space-x-4">
              {/* Course Icon */}
              <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-xl rounded-full">
                {course.icon}
              </div>

              {/* Course Info */}
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500">{course.instructor} • {course.date}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-12 h-12">
              <CircularProgressbar
                value={course.progress}
                text={`${course.progress}%`}
                styles={buildStyles({
                  textColor: "#2563eb",
                  pathColor: "#2563eb",
                  trailColor: "#E0E0E0",
                  textSize: "28px",
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAccessedCourses;


