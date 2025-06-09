// src/pages/MenuPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { courseAPI } from "../services/api";
import { toast } from "react-toastify";

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const MenuPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
            key={course._id}
            to={`/home/courses/${course._id}`}
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition"
          >
            <img
              src={course.courseImage}
              alt={course.courseName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {course.courseName}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuPage;