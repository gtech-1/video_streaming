// src/pages/MenuPageAdmin.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { BiEdit, BiTrash } from "react-icons/bi";
import initialCourses from "../components/courseData.json";

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-30%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { y: "-30%", opacity: 0, transition: { duration: 0.2 } },
};

const MenuPageAdmin = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    if (editingCourse) {
      setNewName(editingCourse.name);
      setNewImage(editingCourse.image);
    }
  }, [editingCourse]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setNewName("");
    setNewImage("");
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newImage) return;

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourse.id
            ? { ...course, name: newName.trim(), image: newImage }
            : course
        )
      );
    } else {
      const newCourse = {
        id: uuidv4(),
        name: newName.trim(),
        image: newImage,
      };
      setCourses((prev) => [newCourse, ...prev]);
    }

    setEditingCourse(null);
    setNewName("");
    setNewImage("");
    setShowModal(false);
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Computer Science Courses (Admin)
          </h1>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Course
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div key={course.id} className="relative group">
              <Link
                to={`/home/courses/${course.id}`}
                className="block bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition"
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

              {/* Edit & Delete buttons: always visible on mobile, hover-only on larger screens */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(course)}
                  className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <BiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <BiTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal for Adding/Editing Course */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={() => {
              setShowModal(false);
              setEditingCourse(null);
            }}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="courseName"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Course Name
                  </label>
                  <input
                    id="courseName"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Data Structures"
                  />
                </div>
                <div>
                  <label
                    htmlFor="courseImage"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {editingCourse ? "Change Image" : "Upload Image"}
                  </label>
                  <input
                    id="courseImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-gray-900 dark:text-gray-100"
                  />
                </div>

                {newImage && (
                  <div className="mt-2">
                    <span className="block text-gray-700 dark:text-gray-300 mb-1">
                      Preview:
                    </span>
                    <img
                      src={newImage}
                      alt="Preview"
                      className="w-full h-40 object-contain border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCourse(null);
                      setNewName("");
                      setNewImage("");
                    }}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {editingCourse ? "Save Changes" : "Add Course"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuPageAdmin;
