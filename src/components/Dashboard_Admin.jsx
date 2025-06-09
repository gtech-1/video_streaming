import React from "react";
import { useSelector } from "react-redux";
import WelcomeBackAdmin from "./Dashboard_adm/WelcombackAdmin";
import AdminStatsCards from "./Dashboard_adm/AdminStatsCards";
import DailyWeeklySummary from "./Dashboard_adm/DailyWeeklySummary";
import TimetableComponent from "./Dashboard_adm/TimetableComponent";
import CalendarComponent from "./CalenderComponent";
import FeedbackPanel from "./Dashboard_adm/FeedbackPanel";
import ReportsPanel from "./Dashboard_adm/ReportsPanel";
import AuditLogs from "./Dashboard_adm/AuditLogs";
import NotificationBroadcaster from "./Dashboard_adm/NotificationBroadcasrer";
import SubscriptionOverview from "./Dashboard_adm/SubscriptionOverview";
import TopStudents from "./TopStudents";

const Dashboard_Admin = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16 flex flex-col items-center p-4 sm:p-6 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Welcome Section */}
      <div className="w-full max-w-6xl mb-4">
        <WelcomeBackAdmin />
      </div>

      {/* Statistics Cards */}
      <div className="w-full max-w-6xl mb-6">
        <AdminStatsCards />
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <DailyWeeklySummary />
        <TimetableComponent />
        <CalendarComponent />
        <FeedbackPanel />
        <ReportsPanel />
        <AuditLogs />
        <NotificationBroadcaster />
        <SubscriptionOverview />
        <TopStudents />
      </div>
    </div>
  );
};

export default Dashboard_Admin;