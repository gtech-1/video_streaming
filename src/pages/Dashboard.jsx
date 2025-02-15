// // import CourseProgress from "../components/CourseProgress";
// // import Assignments from "../components/Assignments";
// // import RecentCourses from "../components/RecentCourses";
// // import PerformanceAnalytics from "../components/PerformanceAnalytics";

// // const Dashboard = () => {
// //     return (
// //         <div style={styles.container}>
// //             <h1 style={styles.title}>📚 Student Dashboard</h1>

// //             <div style={styles.row}>
// //                 <div style={styles.box}><h2>📈 Course Progress</h2><CourseProgress /></div>
// //                 <div style={styles.box}><h2>📝 Upcoming Assignments</h2><Assignments /></div>
// //             </div>

// //             <div style={styles.row}>
// //                 <div style={styles.box}><h2>📂 Recently Accessed Courses</h2><RecentCourses /></div>
// //                 <div style={styles.box}><h2>📊 Grades & Performance</h2><PerformanceAnalytics /></div>
// //             </div>
// //         </div>
// //     );
// // };

// // const styles = {
// //     container: {
// //         backgroundColor: "#6A0DAD",
// //         minHeight: "100vh",
// //         padding: "20px",
// //         textAlign: "center",
// //     },
// //     title: {
// //         color: "white",
// //         fontSize: "28px",
// //         marginBottom: "20px",
// //     },
// //     row: {
// //         display: "flex",
// //         justifyContent: "center",
// //         gap: "20px",
// //         marginBottom: "20px",
// //     },
// //     box: {
// //         backgroundColor: "white",
// //         padding: "20px",
// //         borderRadius: "10px",
// //         boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
// //         minWidth: "250px",
// //         flex: 1,
// //         textAlign: "left",
// //     },
// // };

// // export default Dashboard;
// import CourseProgress from "../components/CourseProgress";
// import Assignments from "../components/Assignments";
// import RecentCourses from "../components/RecentCourses";
// import PerformanceAnalytics from "../components/PerformanceAnalytics";
// import "../styles/Dashboard.css"; // Import CSS

// const Dashboard = () => {
//     return (
//         <div className="dashboard-container">
//             <h1 className="dashboard-title">📚 Student Dashboard</h1>

//             <div className="row">
//                 <div className="box"><h2>📈 Course Progress</h2><CourseProgress /></div>
//                 <div className="box"><h2>📝 Upcoming Assignments</h2><Assignments /></div>
//             </div>

//             <div className="row">
//                 <div className="box"><h2>📂 Recently Accessed Courses</h2><RecentCourses /></div>
//                 <div className="box"><h2>📊 Grades & Attendance</h2><PerformanceAnalytics /></div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;import React from "react";
import React, { useState } from "react"; 
import Navbar from "../components/Navbar";
import FAQSection from "../components/FAQSection";
import CourseProgress from "../components/CourseProgress";
import Assignments from "../components/Assignments";
import RecentCourses from "../components/RecentCourses";
import GradesAnalytics from "../components/GradesAnalytics";
import AttendanceAnalytics from "../components/AttendanceAnalytics";
import Sidebar from "../components/Sidebar"; // Import Sidebar
// import "../styles/Dashboard.css"; // Ensure Dashboard styles are included
// import "../styles/Dashboard.css"; // Import CSS

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

    return (
        <div className="dashboard-container">
            {/* Include Navbar */}
            <Navbar />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 

            {/* Main Dashboard Content (Adjusts Based on Sidebar) */}
            <div className={`dashboard-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>


            <h1 className="dashboard-title"> "  " </h1>

            {/* <div className="dashboard-content"> */}
                <div className="row">
                    <div className="box box-gray">
                        <h2>📈 Course Progress</h2>
                        <CourseProgress />
                    </div>
                    <div className="box box-gray">
                        <h2>📝 Upcoming Assignments</h2>
                        <Assignments />
                    </div>
                    <div className="box box-gray">
                        <h2>📂 Recently Accessed Courses</h2>
                        <RecentCourses />
                    </div>
                </div>

                <div className="row">
                    <div className="box box-gray">
                        <h2>📊 Grade Analytics</h2>
                        <GradesAnalytics />
                    </div>
                    <div className="box box-gray">
                        <h2>📌 Attendance Analytics</h2>
                        <AttendanceAnalytics />
                    </div>
                    <div className="box box-gray">
                        <h2>❓ Frequently Asked Questions</h2>
                        <FAQSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
