import React from "react";
import { FaGraduationCap, FaUsers, FaBook, FaUserFriends } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Courses",
    value: 98,
    icon: <FaGraduationCap className="text-purple-500 text-2xl sm:text-3xl" />,
  },
  {
    id: 2,
    title: "Total Users",
    value: 17,
    icon: <FaUsers className="text-green-500 text-2xl sm:text-3xl" />,
  },
  {
    id: 3,
    title: "Active Courses",
    value: 50,
    icon: <FaBook className="text-blue-500 text-2xl sm:text-3xl" />,
  },
  {
    id: 4,
    title: "Active Users",
    value: 12,
    icon: <FaUserFriends className="text-orange-500 text-2xl sm:text-3xl" />,
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-blue-100 dark:bg-slate-800 text-blue-900 dark:text-white 
                     p-4 rounded-lg shadow-md border border-blue-200 dark:border-slate-700 
                     hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-between"
        >
          <div>{stat.icon}</div>
          <div className="text-right">
            <p className="text-sm sm:text-base font-medium">{stat.title}</p>
            <p className="text-lg sm:text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
