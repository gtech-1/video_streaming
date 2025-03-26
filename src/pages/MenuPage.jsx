import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const courses = [
  { id: "python", name: "Python Programming", image: "/assets/python.jpg" },
  { id: "java", name: "Java Programming", image: "/assets/java.jpg" },
  { id: "web", name: "Web Development", image: "/assets/web.jpg" },
  { id: "ds", name: "Data Structures", image: "/assets/ds.jpg" },
  { id: "ml", name: "Machine Learning", image: "/assets/ml.jpg" },
  { id: "dbms", name: "Database Management", image: "/assets/dbms.jpg" },
  { id: "os", name: "Operating Systems", image: "/assets/os.jpg" },
  { id: "networks", name: "Computer Networks", image: "/assets/networks.jpg" },
  { id: "cybersec", name: "Cyber Security", image: "/assets/cybersec.jpg" },
];

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Courses = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Computer Science Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/home/courses/${course.id}`}
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {course.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Courses;
