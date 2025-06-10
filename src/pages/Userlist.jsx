import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { userAPI } from "../services/api";
import { toast } from "react-hot-toast";

// Ensure each user has a stable `id`
const initializeUsers = (users) =>
  users.map((user) => ({
    id: user._id,
    ...user,
  }));

const UserList = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar?.isOpen ?? true);

  // Track desktop vs. mobile layout
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Core data: only "members" type
  const [members, setMembers] = useState([]);

  // Filters & pagination
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "active", "inactive"
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Ref to handle outside clicks on filter dropdown
  const filterRef = useRef(null);

  // Close filter dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch all members on mount (read‐only)
  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await userAPI.getMembers();
        const all = res.data.map(user => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          mobile: user.mobile,
          photo: user.photo,
          status: user.status,
          userType: user.userType
        }));
        setMembers(all);
      } catch (err) {
        console.error("Failed to load members:", err);
        toast.error("Failed to load members");
      }
    }
    loadMembers();
  }, []);

  // Apply status filter ("all" / "active" / "inactive")
  const filteredData = useMemo(() => {
    if (filterStatus === "all") return members;
    if (filterStatus === "active") {
      return members.filter((u) => u.status === "Active");
    }
    return members.filter((u) => u.status !== "Active");
  }, [members, filterStatus]);

  // Pagination: calculate pages & slice data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    setShowFilters(false);
    setCurrentPage(1);
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 p-6 overflow-x-hidden ${
        isDesktop && !isSidebarOpen ? "pl-[67px]" : ""
      }`}
    >
      <div className="w-full mx-auto transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Members
          </h2>

          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiFilter className="mr-1" /> Filter
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 z-10">
                <button
                  onClick={() => handleFilterStatus("all")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterStatus("active")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Active
                </button>
                <button
                  onClick={() => handleFilterStatus("inactive")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Inactive
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Total Count */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 text-sm shadow-sm">
          <span className="text-gray-900 dark:text-white">
            Total Members: {filteredData.length}
          </span>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {paginatedData.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {user.mobile}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["Photo", "Name", "Mobile", "Email", "Status"].map((hdr) => (
                  <th
                    key={hdr}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300"
                  >
                    {hdr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {user.mobile}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > rowsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="text-sm" /> Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <FiChevronRight className="text-sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
