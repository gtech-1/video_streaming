import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeBack from "./WelcomeBack";
import StatisticsChart from "./StatisticsChart";
import CalendarComponent from "./CalenderComponent";
import CreditsDoughnutChart from "./CreditsDoughnutChart";
import RecentlyAccessedCourses from "./RecentlyAccessedCourses";
import AttendanceBarGraph from "./AttendanceBarGraph";
import TopStudents from "./TopStudents";
import CgpaLineGraph from "./CgpaLineGraph";
import StatsCards from "./StatsCards";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-16 flex flex-col items-center p-4 sm:p-6">
       {/* <div className="mb-6"></div>
       <div className="mb-6"></div> */}
      {/* Welcome Section */}
      <div className="w-full max-w-6xl mb-4">
        <WelcomeBack />
      </div>

      {/* Statistics Cards */}
      <div className="w-full max-w-6xl">
        <StatsCards />
      </div>

      <div className="mb-6"></div>

      {/* Main Grid Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Row 1 */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-blue-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <CreditsDoughnutChart />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-red-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <StatisticsChart />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-green-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <CalendarComponent />
        </div>

        {/* Row 2 */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-purple-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <TopStudents />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <AttendanceBarGraph />
        </div>

        {/* Row 3 (Updated: Split into Two Columns) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-indigo-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <CgpaLineGraph />
        </div>
        
        {/* Last Row: 2 Components in One Row */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg">
        <FrequentlyAskedQuestions />
         
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1.5bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg">
        <RecentlyAccessedCourses />
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
