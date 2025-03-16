
import React from "react";
import OfficeIllustration from "../assets/rr.svg"; // Adjust the path

const WelcomeBack = () => {
  return (
    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:justify-between">
      
      {/* Left Text Section */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
          Welcome back, <span className="text-blue-600 font-bold">GuruPrasad Pattar!</span>
        </h1>
        <p className="text-gray-600">
          Your students completed <span className="text-orange-500 font-semibold">80%</span> of the tasks.
        </p>
        <p className="text-gray-700">
          Progress is <span className="text-orange-600 font-bold">very good!</span>
        </p>
      </div>

      {/* Right Illustration Section */}
      <div className="relative flex items-center mt-4 sm:mt-0">
        <img src={OfficeIllustration} alt="Office Illustration" className="w-32 sm:w-40" />
      </div>
    </div>
  );
};

export default WelcomeBack;




