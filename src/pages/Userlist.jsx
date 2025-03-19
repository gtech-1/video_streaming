import React, { useState, useMemo, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import UserDetails from "../components/UserDetails.json";
import { FaEdit, FaTrash, FaPlus, FaDownload, FaUpload } from "react-icons/fa";
import { FiFilter, FiChevronLeft, FiChevronRight, FiMoreVertical } from "react-icons/fi";

// Initialize data with unique ids if not provided
const initializeUsers = (users) =>
  users.map((user, index) => ({
    id: user.id || Date.now() + index,
    ...user,
  }));

const UserList = ({ isSidebarOpen }) => {
  // State initialization
  const [members, setMembers] = useState(initializeUsers(UserDetails.members));
  const [admins, setAdmins] = useState(initializeUsers(UserDetails.admins));
  const [userType, setUserType] = useState("members");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Modal states and selected user for edit/delete
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New state for mobile "More Options" dropdown
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Memoized current data based on selected user type
  const currentData = useMemo(() => {
    return userType === "members" ? members : admins;
  }, [userType, members, admins]);

  // Memoized filtered data based on user status
  const filteredData = useMemo(() => {
    if (filterStatus === "all") return currentData;
    if (filterStatus === "active")
      return currentData.filter((user) => user.status === "Active");
    if (filterStatus === "inactive")
      return currentData.filter((user) => user.status !== "Active");
    return currentData;
  }, [currentData, filterStatus]);

  // Memoized pagination calculations
  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / rowsPerPage),
    [filteredData, rowsPerPage]
  );
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Handlers using useCallback
  const handleUserTypeChange = useCallback((type) => {
    setUserType(type);
    setCurrentPage(1);
  }, []);

  const handleAddUser = useCallback(
    (newUser) => {
      newUser.id = Date.now();
      if (userType === "members") {
        setMembers((prev) => [newUser, ...prev]);
      } else {
        setAdmins((prev) => [newUser, ...prev]);
      }
      setShowAddModal(false);
      toast.success("User added successfully");
    },
    [userType]
  );

  const handleEditUser = useCallback(
    (updatedUser) => {
      if (userType === "members") {
        setMembers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        setAdmins((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      }
      setShowEditModal(false);
      setSelectedUser(null);
      toast.success("User updated successfully");
    },
    [userType]
  );

  const handleDeleteUser = useCallback(
    (userId) => {
      if (userType === "members") {
        setMembers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        setAdmins((prev) => prev.filter((user) => user.id !== userId));
      }
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:px-3 md:py-3">
      <Toaster position="top-right" />

      <div
        className={`w-full md:transition-all md:duration-300 ${
          isSidebarOpen
            ? "md:mx-0 md:w-full md:pl-0"
            : "md:mx-[15px] md:w-[calc(100%-50px)] md:pl-8"
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleUserTypeChange("members")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                userType === "members"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Members ({members.length})
            </button>
            <button
              onClick={() => handleUserTypeChange("admins")}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                userType === "admins"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Admins ({admins.length})
            </button>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50"
              >
                <FaPlus className="mr-2" /> Add
              </button>

              {/* Mobile view: More Options for Export & Import */}
              <div className="block sm:hidden relative">
                <button
                  onClick={() => setShowMoreOptions((prev) => !prev)}
                  className="bg-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50"
                >
                  <FiMoreVertical className="text-lg" />
                </button>
                {showMoreOptions && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-lg border border-gray-200 z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                      <FaDownload className="mr-2 inline-block" /> Export
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                      <FaUpload className="mr-2 inline-block" /> Import
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop view: Export & Import Buttons */}
              <div className="hidden sm:flex gap-2">
                <button className="bg-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50">
                  <FaDownload className="mr-2" /> Export
                </button>
                <button className="bg-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50">
                  <FaUpload className="mr-2" /> Import
                </button>
              </div>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="bg-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-gray-50"
              >
                <FiFilter className="mr-2" /> Filter
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border border-gray-200 z-10">
                  <button
                    onClick={() => handleFilterStatus("all")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterStatus("active")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleFilterStatus("inactive")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Inactive
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Count */}
        <div className="bg-white p-3 rounded-lg mb-4 text-sm shadow-sm">
          Total {userType}: {filteredData.length}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {paginatedData.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{user.mobile}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
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
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Login
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Photo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Operations
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.mobile}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
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
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredData.length > rowsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="text-sm" /> Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <FiChevronRight className="text-sm" />
            </button>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Add User</h2>
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
                  };
                  handleAddUser(newUser);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Mobile</label>
                  <input
                    name="mobile"
                    type="text"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Photo URL</label>
                  <input
                    name="photo"
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Status</label>
                  <select
                    name="status"
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Edit User</h2>
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
                <div className="mb-4">
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    name="name"
                    defaultValue={selectedUser.name}
                    type="text"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    name="email"
                    defaultValue={selectedUser.email}
                    type="email"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Mobile</label>
                  <input
                    name="mobile"
                    defaultValue={selectedUser.mobile}
                    type="text"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Photo URL</label>
                  <input
                    name="photo"
                    defaultValue={selectedUser.photo}
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedUser.status}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Confirm Delete</h2>
              <p>
                Are you sure you want to delete{" "}
                <strong>{selectedUser.name}</strong>?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteUser(selectedUser.id)}
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