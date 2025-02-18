import React from "react";

const QuickLinks = () => {
  const links = ["Assignments", "Marks", "Attendance", "Progress"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
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
