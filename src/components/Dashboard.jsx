import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import { dashboardAPI } from "../services/api";

const Dashboard = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
        console.log('Token:', localStorage.getItem('token'));
        console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
        
        const response = await dashboardAPI.getDashboardData();
        console.log('Full API Response:', response);
        console.log('Dashboard data received:', response.data);
        
        if (response.data) {
          setDashboardData(response.data);
          console.log('Dashboard data set to state:', response.data);
        } else {
          console.error('No data received from API');
          setError('No data received from API');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Debug render
  console.log('Current dashboard data in state:', dashboardData);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading dashboard: {error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-xl text-red-500">No dashboard data available</div>
      </div>
    );
  }

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
        <CreditsDoughnutChart data={dashboardData.creditsDoughnutChart} />
        <StatisticsChart data={dashboardData.statisticsChart} />
        <CalendarComponent />
        <TopStudents data={dashboardData.topStudents} />
        <AttendanceBarGraph data={dashboardData.attendanceBarGraph} />
        <CgpaLineGraph data={dashboardData.cgpaLineGraph} />
        <FrequentlyAskedQuestions data={dashboardData.frequentlyAskedQuestions} />
        <RecentlyAccessedCourses data={dashboardData.recentlyAccessedCourses} />
      </div>
    </div>
  );
};

export default Dashboard;



