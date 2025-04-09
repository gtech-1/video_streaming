// import { useSelector } from "react-redux";
// import WelcomeBack from "./WelcomeBack";
// import StatisticsChart from "./StatisticsChart";
// import CalendarComponent from "./CalenderComponent";
// import CreditsDoughnutChart from "./CreditsDoughnutChart";
// import RecentlyAccessedCourses from "./RecentlyAccessedCourses";
// import AttendanceBarGraph from "./AttendanceBarGraph";
// import TopStudents from "./TopStudents";
// import CgpaLineGraph from "./CgpaLineGraph";
// import StatsCards from "./StatsCards";
// import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

// const Dashboard = () => {
//   const darkMode = useSelector((state) => state.theme.darkMode); 

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex flex-col items-center p-4 sm:p-6 text-gray-900 dark:text-white transition-colors duration-300">

//       {/* Welcome Section */}
//       <div className="w-full max-w-6xl mb-4">
//         <WelcomeBack />
//       </div>

//       {/* Statistics Cards */}
//       <div className="w-full max-w-6xl mb-6">
//         <StatsCards />
//       </div>

//       {/* Main Grid Layout */}
//       <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         <div className="transition-transform duration-300 hover:scale-105">
//           <CreditsDoughnutChart />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <StatisticsChart />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <CalendarComponent />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <TopStudents />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <AttendanceBarGraph />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <CgpaLineGraph />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <FrequentlyAskedQuestions />
//         </div>
//         <div className="transition-transform duration-300 hover:scale-105">
//           <RecentlyAccessedCourses />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import { useSelector } from "react-redux";
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
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex flex-col items-center p-4 sm:p-6 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Welcome Section */}
      <div className="w-full max-w-6xl mb-4">
        <WelcomeBack />
      </div>

      {/* Statistics Cards */}
      <div className="w-full max-w-6xl mb-6">
        <StatsCards />
      </div>

      
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CreditsDoughnutChart />
        <StatisticsChart />
        <CalendarComponent />
        <TopStudents />
        <AttendanceBarGraph />
        <CgpaLineGraph />
        <FrequentlyAskedQuestions />
        <RecentlyAccessedCourses />
      </div>
    </div>
  );
};

export default Dashboard;
