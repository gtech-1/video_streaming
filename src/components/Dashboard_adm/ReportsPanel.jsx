// ReportsPanel.jsx
import React from "react";

const reportsData = [
  {
    id: 1,
    title: "Course content outdated",
    user: "Alice Johnson",
    date: "2025-05-28",
    status: "Pending",
  },
  {
    id: 2,
    title: "Login issue on mobile",
    user: "Mark Spencer",
    date: "2025-05-27",
    status: "Resolved",
  },
  {
    id: 3,
    title: "Video playback errors",
    user: "Jane Doe",
    date: "2025-05-25",
    status: "In Progress",
  },
];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Resolved: "bg-green-200 text-green-800",
  "In Progress": "bg-blue-200 text-blue-800",
};

const ReportsPanel = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-3xl transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📋 Recent Reports</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">User</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 text-gray-700 dark:text-gray-300">{report.title}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{report.user}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{report.date}</td>
                <td className={`p-3 font-semibold rounded-md w-max ${statusColors[report.status]}`}>
                  {report.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPanel;
