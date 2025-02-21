import React from "react";
import UpcomingEvents from "./UpcomingEvents";
import Announcements from "./Announcements";
import RecommendedCourses from "./RecommendedCourses";
import ProfileCard from "./ProfileCard";
import QuickLinks from "./QuickLinks";
import Chatbot from "./Chatbot";
import FAQ from "./FAQ";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <ProfileCard />
        <UpcomingEvents />
        <QuickLinks />
        <Announcements />
        <RecommendedCourses />
        <FAQ/>
        <Chatbot />
      </div>
     </div>
  );
};

export default Dashboard;
