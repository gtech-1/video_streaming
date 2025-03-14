import React from "react";

const topStudents = [
  { id: 1, name: "John Doe", department: "CSE", sgpa: 9.8 },
  { id: 2, name: "Alice Smith", department: "ECE", sgpa: 9.5 },
  { id: 3, name: "Michael Johnson", department: "MECH", sgpa: 9.3 },

];

const TopStudents = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg">
      {/* Header */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        🏆 Top Performers
      </h2>

      {/* Table Container with Scroll on Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left text-sm sm:text-base">
              <th className="p-2 sm:p-3">Rank</th>
              <th className="p-2 sm:p-3">Student Name</th>
              <th className="p-2 sm:p-3">SGPA</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, index) => (
              <tr key={student.id} className="border-b text-sm sm:text-base">
                <td className="p-2 sm:p-3 font-bold text-gray-700">{index + 1}</td>
                <td className="p-2 sm:p-3 text-gray-600">
                  {student.name} ({student.department})
                </td>
                <td className="p-2 sm:p-3 font-semibold text-green-600">{student.sgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudents;
