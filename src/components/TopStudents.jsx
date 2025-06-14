import React from "react";

const TopStudents = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg transition-colors duration-300">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🏆 Top Performers
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm sm:text-base">
              <th className="p-2 sm:p-3">Rank</th>
              <th className="p-2 sm:p-3">Student Name</th>
              <th className="p-2 sm:p-3">SGPA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr
                key={student._id}
                className="border-b border-gray-200 dark:border-gray-700 text-sm sm:text-base"
              >
                <td className="p-2 sm:p-3 font-bold text-gray-700 dark:text-white">
                  {index + 1}
                </td>
                <td className="p-2 sm:p-3 text-gray-600 dark:text-gray-300">
                  {student.name} ({student.department})
                </td>
                <td className="p-2 sm:p-3 font-semibold text-green-600 dark:text-green-400">
                  {student.sgpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudents;
