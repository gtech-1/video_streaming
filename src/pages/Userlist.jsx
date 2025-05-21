import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import UserDetails from "../components/UserDetails.json";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload,
  FaUpload,
} from "react-icons/fa";
import {
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
} from "react-icons/fi";
import { useSelector } from "react-redux";

// Ensure each user has a stable `id` for React lists
const initializeUsers = (users) =>
  users.map((user, idx) => ({
    id: user.id || user._id || Date.now() + idx,
    ...user,
  }));

const UserList = () => {
  // Sidebar state from Redux
  const isSidebarOpen = useSelector(
    (state) => state.sidebar?.isOpen ?? true
  );

  // Track desktop vs mobile
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1280
  );
  useEffect(() => {
    const handleResize = () =>
      setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Core data state
  const [members, setMembers] = useState(() =>
    initializeUsers(UserDetails.members)
  );
  const [admins, setAdmins] = useState(() =>
    initializeUsers(UserDetails.admins)
  );
  const [userType, setUserType] = useState("members");

  // Filters & pagination
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Modal & selection state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mobile “more” dropdown
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Refs for click-outside handlers
  const filterRef = useRef(null);
  const moreOptionsRef = useRef(null);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handle = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () =>
      document.removeEventListener("mousedown", handle);
  }, []);

  // Close “more” dropdown on outside click
  useEffect(() => {
    const handle = (e) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(e.target)
      ) {
        setShowMoreOptions(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () =>
      document.removeEventListener("mousedown", handle);
  }, []);

  // Data derived from state
  const currentData = useMemo(
    () => (userType === "members" ? members : admins),
    [userType, members, admins]
  );
  const filteredData = useMemo(() => {
    if (filterStatus === "all") return currentData;
    if (filterStatus === "active")
      return currentData.filter((u) => u.status === "Active");
    return currentData.filter((u) => u.status !== "Active");
  }, [currentData, filterStatus]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / rowsPerPage),
    [filteredData]
  );
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  // Handlers
  const handleUserTypeChange = useCallback((type) => {
    setUserType(type);
    setCurrentPage(1);
  }, []);

  // ← UPDATED: async POST including userType
  const handleAddUser = useCallback(
    async (newUser) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/users/create",
          newUser,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const created = res.data.data;
        const withId = { ...created, id: created._id };

        if (newUser.userType === "members") {
          setMembers((prev) => [withId, ...prev]);
        } else {
          setAdmins((prev) => [withId, ...prev]);
        }
        toast.success("User added successfully");
      } catch (err) {
        console.error(err);
        toast.error(
          err.response?.data?.message ||
            "Failed to add user, please try again."
        );
      } finally {
        setShowAddModal(false);
      }
    },
    []
  );

  const handleEditUser = useCallback(
    (updatedUser) => {
      const updater = (prev) =>
        prev.map((u) =>
          u.id === updatedUser.id ? updatedUser : u
        );
      if (userType === "members") setMembers(updater);
      else setAdmins(updater);

      setShowEditModal(false);
      setSelectedUser(null);
      toast.success("User updated successfully");
    },
    [userType]
  );

  const handleDeleteUser = useCallback(
    (id) => {
      const remover = (prev) =>
        prev.filter((u) => u.id !== id);
      if (userType === "members") setMembers(remover);
      else setAdmins(remover);

      setShowDeleteModal(false);
      setSelectedUser(null);
      toast.success("User deleted successfully");
    },
    [userType]
  );

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
      <Toaster position="top-right" />

      <div className="w-full mx-auto transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleUserTypeChange("members")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                userType === "members"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white"
              }`}
            >
              Members ({members.length})
            </button>
            <button
              onClick={() => handleUserTypeChange("admins")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                userType === "admins"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white"
              }`}
            >
              Admins ({admins.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
            <div className="flex flex-wrap gap-2">
              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FaPlus className="mr-2" /> Add
              </button>

              {/* Mobile “More” */}
              <div
                className="block sm:hidden relative"
                ref={moreOptionsRef}
              >
                <button
                  onClick={() => {
                    setShowMoreOptions((v) => !v);
                    setShowFilters(false);
                  }}
                  className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FiMoreVertical className="text-lg" />
                </button>
                {showMoreOptions && (
                  <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FaDownload className="mr-2 inline-block" /> Export
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FaUpload className="mr-2 inline-block" /> Import
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop Export/Import */}
              <div className="hidden sm:flex gap-2">
                <button className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaDownload className="mr-2" /> Export
                </button>
                <button className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FaUpload className="mr-2" /> Import
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => {
                  setShowFilters((v) => !v);
                  setShowMoreOptions(false);
                }}
                className="bg-white dark:bg-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiFilter className="mr-2" /> Filter
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 z-10">
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
        </div>

        {/* Total Count */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 text-sm shadow-sm">
          <span className="text-gray-900 dark:text-white">
            Total {userType}: {filteredData.length}
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
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50"
                  >
                    <FaEdit className="text-base" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50"
                  >
                    <FaTrash className="text-base" />
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Login
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "Photo",
                  "Name",
                  "Mobile",
                  "Email",
                  "Status",
                  "Operations",
                  "Actions",
                ].map((hdr) => (
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Login
                    </button>
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
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="text-sm" /> Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <FiChevronRight className="text-sm" />
            </button>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
                Add User
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const newUser = {
                    name: form.name.value,
                    email: form.email.value,
                    mobile: form.mobile.value,
                    photo:
                      form.photo.value ||
                      "https://via.placeholder.com/150",
                    status: form.status.value,
                    userType: form.userType.value,
                  };
                  handleAddUser(newUser);
                }}
              >
                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Mobile
                </label>
                <input
                  name="mobile"
                  type="text"
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Photo URL
                </label>
                <input
                  name="photo"
                  type="text"
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  User Type
                </label>
                <select
                  name="userType"
                  defaultValue={userType}
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                >
                  <option value="members">Member</option>
                  <option value="admins">Admin</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
                Edit User
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const updatedUser = {
                    ...selectedUser,
                    name: form.name.value,
                    email: form.email.value,
                    mobile: form.mobile.value,
                    photo: form.photo.value,
                    status: form.status.value,
                  };
                  handleEditUser(updatedUser);
                }}
              >
                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  name="name"
                  defaultValue={selectedUser.name}
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={selectedUser.email}
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Mobile
                </label>
                <input
                  name="mobile"
                  defaultValue={selectedUser.mobile}
                  required
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Photo URL
                </label>
                <input
                  name="photo"
                  defaultValue={selectedUser.photo}
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                />

                <label className="block text-sm mb-1 text-gray-900 dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={selectedUser.status}
                  className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
                Confirm Delete
              </h2>
              <p className="text-gray-900 dark:text-white">
                Are you sure you want to delete{" "}
                <strong>{selectedUser.name}</strong>?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleDeleteUser(selectedUser.id)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
