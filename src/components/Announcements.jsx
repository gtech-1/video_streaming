import React from "react";

const Announcements = () => {
  const announcements = [
    "Mid-term exam next week!",
    "New assignment added in OOPS.",
    "System maintenance on March 10."
  ];

  return (
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Indigo animated border */}
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
      <h2 className="text-xl font-bold mb-3">📢 Announcements</h2>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index} className="p-2 border-b">{announcement}</li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
