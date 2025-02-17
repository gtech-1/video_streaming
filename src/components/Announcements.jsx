import React from "react";

const Announcements = () => {
  const announcements = [
    "Mid-term exam next week!",
    "New assignment added in Science.",
    "System maintenance on March 10."
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
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
