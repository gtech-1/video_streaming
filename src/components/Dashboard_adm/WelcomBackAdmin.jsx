import React,{useState} from "react";
import AdminIllustration from "../../assets/rr.svg"; 

const WelcomeBackAdmin = () => {

   const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
// Get user details from localStorage
const userDetails = localStorage.getItem("user");
console.log(userDetails, "userDetails");

let userData = null;

if (userDetails && userDetails !== "undefined") {
  try {
    userData = JSON.parse(userDetails);
  } catch (e) {
    console.error("Failed to parse user data from localStorage:", e);
  }
}

// Get first name and last name, with formatting
const firstName = capitalize(userData?.firstName || "");
const lastName = capitalize(userData?.lastName || "");

  return (
    <div
      className="p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:justify-between 
                 bg-[#EFF6FF] dark:bg-[rgb(17,24,39)] transition-colors duration-300"
    >
      {/* Left Section - Greeting */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
         Welcome back, <span className="text-blue-600 font-bold">{firstName} {lastName}!</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-200">
          You have <span className="text-blue-500 font-semibold">5 reports</span> to review.
        </p>
        <p className="text-gray-800 dark:text-white">
        System health is <span className="text-green-500 font-bold">stable</span> and running smoothly.
        </p>
      </div>
      <div> 


        </div>

      {/* Right Section - Illustration */}
      <div className="relative flex items-center mt-4 sm:mt-0">
        <img src={AdminIllustration} alt="Admin Illustration" className="w-32 sm:w-40" />
      </div>
    </div>
  );
};

export default WelcomeBackAdmin;
