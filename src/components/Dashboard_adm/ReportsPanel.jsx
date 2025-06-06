// // // ReportsPanel.jsx
// // import React from "react";

// // const reportsData = [
// //   {
// //     id: 1,
// //     title: "Course content outdated",
// //     user: "Alice Johnson",
// //     date: "2025-05-28",
// //     status: "Pending",
// //   },
// //   {
// //     id: 2,
// //     title: "Login issue on mobile",
// //     user: "Mark Spencer",
// //     date: "2025-05-27",
// //     status: "Resolved",
// //   },
// //   {
// //     id: 3,
// //     title: "Video playback errors",
// //     user: "Jane Doe",
// //     date: "2025-05-25",
// //     status: "In Progress",
// //   },
// // ];

// // const statusColors = {
// //   Pending: "bg-yellow-200 text-yellow-800",
// //   Resolved: "bg-green-200 text-green-800",
// //   "In Progress": "bg-blue-200 text-blue-800",
// // };

// // const ReportsPanel = () => {
// //   return (
// //     <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-3xl transition-colors duration-300">
// //       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📋 Recent Reports</h2>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-collapse text-sm sm:text-base">
// //           <thead>
// //             <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
// //               <th className="p-3">Title</th>
// //               <th className="p-3">User</th>
// //               <th className="p-3">Date</th>
// //               <th className="p-3">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {reportsData.map((report) => (
// //               <tr key={report.id} className="border-b border-gray-200 dark:border-gray-700">
// //                 <td className="p-3 text-gray-700 dark:text-gray-300">{report.title}</td>
// //                 <td className="p-3 text-gray-600 dark:text-gray-400">{report.user}</td>
// //                 <td className="p-3 text-gray-600 dark:text-gray-400">{report.date}</td>
// //                 <td className={`p-3 font-semibold rounded-md w-max ${statusColors[report.status]}`}>
// //                   {report.status}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportsPanel;



// import React from "react";

// const reportsData = [
//   {
//     id: 1,
//     title: "Course content outdated",
//     user: "Alice Johnson",
//     date: "2025-05-28",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     title: "Login issue on mobile",
//     user: "Mark Spencer",
//     date: "2025-05-27",
//     status: "Resolved",
//   },
//   {
//     id: 3,
//     title: "Video playback errors",
//     user: "Jane Doe",
//     date: "2025-05-25",
//     status: "In Progress",
//   },
// ];

// const statusColors = {
//   Pending: "bg-yellow-200 text-yellow-800",
//   Resolved: "bg-green-200 text-green-800",
//   "In Progress": "bg-blue-200 text-blue-800",
// };

// const ReportsPanel = () => {
//   return (
//     <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md w-full max-w-xl transition-colors duration-300">
//       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📋 Recent Reports</h2>
//       <table className="w-full table-fixed text-sm">
//         <thead>
//           <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
//             <th className="p-2 text-left w-1/3">Title</th>
//             <th className="p-2 text-left w-1/4">User</th>
//             <th className="p-2 text-left w-1/4">Date</th>
//             <th className="p-2 text-left w-1/6">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportsData.map((report) => (
//             <tr key={report.id} className="border-b border-gray-200 dark:border-gray-700">
//               <td className="p-2 text-gray-700 dark:text-gray-300 break-words">{report.title}</td>
//               <td className="p-2 text-gray-600 dark:text-gray-400 break-words">{report.user}</td>
//               <td className="p-2 text-gray-600 dark:text-gray-400">{report.date}</td>
//               <td className={`p-2 font-semibold rounded-md ${statusColors[report.status]}`}>
//                 {report.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportsPanel;



import React from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

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

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Resolved: "bg-green-100 text-green-800",
  "In Progress": "bg-blue-100 text-blue-800",
};

const ReportsPanel = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md w-full h-full transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        📋 Recent Reports
      </h2>

      <div className="space-y-3">
        {reportsData.map((report) => (
          <div
            key={report.id}
            className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-1">
              {report.title}
            </h3>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
              <FaUser className="mr-1.5 text-gray-400" />
              <span>{report.user}</span>
              <FaCalendarAlt className="ml-4 mr-1.5 text-gray-400" />
              <span>{report.date}</span>
            </div>

            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusStyles[report.status]}`}
            >
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPanel;

