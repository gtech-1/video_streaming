


import React from "react";
import { FaGraduationCap, FaUsers, FaBook, FaUserFriends } from "react-icons/fa"; // Icons

const stats = [
  { id: 1, title: "Total Courses", value: 98, icon: <FaGraduationCap className="text-purple-500 text-2xl sm:text-3xl" /> },
  { id: 2, title: "Total Users", value: 17, icon: <FaUsers className="text-green-500 text-2xl sm:text-3xl" /> },
  { id: 3, title: "Active Courses", value: 50, icon: <FaBook className="text-blue-500 text-2xl sm:text-3xl" /> },
  { id: 4, title: "Active Users", value: 12, icon: <FaUserFriends className="text-orange-500 text-2xl sm:text-3xl" /> },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl mt-4">
      {stats.map((stat) => (
        <div 
          key={stat.id} 
          className="bg-blue-100 text-blue-900 p-3 sm:p-4 rounded-lg border-2 border-blue-300 shadow-md 
                     hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-between"
        >
          <div>{stat.icon}</div>
          <div className="text-right">
            <p className="text-sm font-semibold">{stat.title}</p>
            <p className="text-lg sm:text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;







