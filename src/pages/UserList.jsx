import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { membersData, adminsData } from "../components/UserDetails";

const UserList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("members");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const mobileOptionsRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Update itemsPerPage dynamically, but always at least 8 rows.
  useEffect(() => {
    const updateItemsPerPage = () => {
      const availableHeight = window.innerHeight - 250;
      const estimatedRowHeight = 60;
      const dynamicItems = Math.floor(availableHeight / estimatedRowHeight);
      setItemsPerPage(Math.max(dynamicItems, 10));
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileOptionsRef.current &&
        !mobileOptionsRef.current.contains(event.target)
      ) {
        setIsMoreOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullData = selectedTab === "members" ? membersData : adminsData;
  const totalPages = Math.ceil(fullData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = fullData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0 sm:ml-[60px]"
        }`}
      >
        <div className="p-4">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="space-x-2">
              <button
                onClick={() => {
                  setSelectedTab("members");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded ${
                  selectedTab === "members"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Members
              </button>
              <button
                onClick={() => {
                  setSelectedTab("admins");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded ${
                  selectedTab === "admins"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Admins
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add new
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Import members
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Export members
                </button>
              </div>
              <div className="flex sm:hidden relative" ref={mobileOptionsRef}>
                <button
                  onClick={() => setIsMoreOptionsOpen((prev) => !prev)}
                  className="p-2"
                >
                  <FiMoreVertical size={20} />
                </button>
                {isMoreOptionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 min-w-[150px] bg-white text-gray-900 border rounded-lg shadow-lg p-3 z-50"
                  >
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Add new
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Import members
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Export members
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Filter
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-8 mb-4 text-gray-700">
            <div>Total members: {fullData.length}</div>
            <div>Current used: {fullData.length}</div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Member Name</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Mobile</th>
                  <th className="px-4 py-3 hidden md:table-cell">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Operation</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      {user.mobile}
                    </td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm font-bold ${
                          user.status === "Active"
                            ? "bg-green-100 border border-green-500 text-green-700"
                            : "bg-red-100 border border-red-500 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 hidden sm:table-cell">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit size={16} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Login
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Simplified Pagination */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300"
                  : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              Prev
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300"
                  : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UserList;