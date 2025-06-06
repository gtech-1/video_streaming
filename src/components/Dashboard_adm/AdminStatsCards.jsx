
import React from "react";
import { FaUsers, FaBookOpen, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: 248,
    icon: <FaUsers className="text-blue-500 text-3xl" />,
  },
  {
    id: 2,
    title: "Total Courses",
    value: 58,
    icon: <FaBookOpen className="text-green-500 text-3xl" />,
  },
  {
    id: 3,
    title: "Active Teachers",
    value: 23,
    icon: <FaChalkboardTeacher className="text-yellow-500 text-3xl" />,
  },
  {
    id: 4,
    title: "Admins",
    value: 4,
    icon: <FaUserShield className="text-red-500 text-3xl" />,
  },
];

const AdminStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white dark:bg-slate-800 text-gray-800 dark:text-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition-all"
        >
          <div>{stat.icon}</div>
          <div className="text-right">
            <p className="text-sm font-medium">{stat.title}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;