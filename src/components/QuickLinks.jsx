import React from "react";

const QuickLinks = () => {
  const links = ["Assignments", "Marks", "Attendance", "Progress"];

  return (
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
    {/* Indigo animated border */}
    <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
      <h2 className="text-xl font-bold mb-3">🔗 Quick Links</h2>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link, index) => (
          <button key={index} className="bg-blue-500 text-white p-2 rounded-md">{link}</button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;

