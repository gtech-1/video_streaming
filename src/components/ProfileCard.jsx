
import React from "react";
const ProfileCard = () => {
  return (
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Indigo animated border */}
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>

      <div className="text-6xl">🎓</div> 
      <h3 className="text-lg font-semibold mt-2">👨‍💻 GuruPrasad Pattar</h3>
      <p className="text-gray-600">🚀 Student | Computer Science 💻</p>
    </div>
  );
};


export default ProfileCard;
