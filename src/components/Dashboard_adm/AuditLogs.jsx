// import React from "react";

// const auditLogs = [
//   {
//     id: 1,
//     user: "admin1",
//     action: "Updated user role",
//     timestamp: "2025-06-01 10:45 AM",
//     details: "Changed role of user 'john_doe' from 'student' to 'moderator'",
//   },
//   {
//     id: 2,
//     user: "moderator2",
//     action: "Deleted course",
//     timestamp: "2025-05-30 02:20 PM",
//     details: "Deleted course 'Intro to React'",
//   },
//   {
//     id: 3,
//     user: "admin1",
//     action: "Reset password",
//     timestamp: "2025-05-29 09:15 AM",
//     details: "Reset password for user 'alice_smith'",
//   },
// ];

// const AuditLogs = () => {
//   return (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-5xl w-full transition-colors duration-300">
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//         🔍 Audit Logs
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
//               <th className="p-3 border border-gray-200 dark:border-gray-700">User</th>
//               <th className="p-3 border border-gray-200 dark:border-gray-700">Action</th>
//               <th className="p-3 border border-gray-200 dark:border-gray-700">Timestamp</th>
//               <th className="p-3 border border-gray-200 dark:border-gray-700">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {auditLogs.map((log) => (
//               <tr
//                 key={log.id}
//                 className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
//               >
//                 <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white">
//                   {log.user}
//                 </td>
//                 <td className="p-3 border border-gray-200 dark:border-gray-700">{log.action}</td>
//                 <td className="p-3 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
//                   {log.timestamp}
//                 </td>
//                 <td className="p-3 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
//                   {log.details}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AuditLogs;


import React from "react";
import { FaUserShield, FaClock, FaInfoCircle } from "react-icons/fa";

const auditLogs = [
  {
    id: 1,
    user: "admin1",
    action: "Updated user role",
    timestamp: "2025-06-01 10:45 AM",
    details: "Changed role of user 'john_doe' from 'student' to 'moderator'",
  },
  {
    id: 2,
    user: "moderator2",
    action: "Deleted course",
    timestamp: "2025-05-30 02:20 PM",
    details: "Deleted course 'Intro to React'",
  },
  {
    id: 3,
    user: "admin1",
    action: "Reset password",
    timestamp: "2025-05-29 09:15 AM",
    details: "Reset password for user 'alice_smith'",
  },
];

const AuditLogs = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md w-full h-full transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🔍 Audit Logs
      </h2>

      <div className="space-y-4">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 bg-gray-50 dark:bg-slate-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-200 font-semibold">
                <FaUserShield className="mr-2 text-blue-500" />
                {log.user}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{log.action}</span>
            </div>

            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
              <FaClock className="mr-1.5 text-gray-400" />
              {log.timestamp}
            </div>

            <div className="flex items-start text-sm text-gray-700 dark:text-gray-300">
              <FaInfoCircle className="mr-2 mt-0.5 text-gray-400" />
              <p className="break-words">{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;

