import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserDetails from "../components/UserDetails.json"; // Import JSON file
import toast, { Toaster } from "react-hot-toast";

// Helper to generate a unique id if one does not exist
const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

const UserList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("members");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const mobileOptionsRef = useRef(null);

  // Modal state for adding a new user
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    photo: "https://via.placeholder.com/150",
    name: "",
    mobile: "",
    email: "",
    status: "Active",
  });

  // Modal state for editing an existing user
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState({
    photo: "https://via.placeholder.com/150",
    name: "",
    mobile: "",
    email: "",
    status: "Active",
  });

  // Modal state for filtering users
  const [showFilterModal, setShowFilterModal] = useState(false);
  // Filter state: by default, show both active and inactive
  const [filter, setFilter] = useState({ Active: true, Inactive: true });

  // Initialize user lists from JSON file with unique ids (if not provided)
  const [members, setMembers] = useState(
    UserDetails.members.map((user) => ({
      ...user,
      id: user.id || generateUniqueId(),
    }))
  );
  const [admins, setAdmins] = useState(
    UserDetails.admins.map((user) => ({
      ...user,
      id: user.id || generateUniqueId(),
    }))
  );

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Dynamically update itemsPerPage based on available height
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine current list based on selected tab and apply filter
  const rawData = selectedTab === "members" ? members : admins;
  const filteredData = rawData.filter((user) => filter[user.status]);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Open Add User modal
  const handleAddUser = () => {
    setShowModal(true);
  };

  // Handle input changes for add-user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit add-user form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserWithId = { ...newUser, id: generateUniqueId() };
    if (selectedTab === "members") {
      setMembers([newUserWithId, ...members]);
    } else {
      setAdmins([newUserWithId, ...admins]);
    }
    // Display confirmation toast
    toast.success("User added successfully!");
    console.log("API call to update JSON file with:", newUserWithId);
    setShowModal(false);
    setNewUser({
      photo: "https://via.placeholder.com/150",
      name: "",
      mobile: "",
      email: "",
      status: "Active",
    });
  };

  // Open edit modal and set the user to edit
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  // Handle input changes for edit-user form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit-user form: update the user in the correct list using its unique id
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedTab === "members") {
      const updatedMembers = members.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
      setMembers(updatedMembers);
    } else {
      const updatedAdmins = admins.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
      setAdmins(updatedAdmins);
    }
    toast.success("User updated successfully!");
    console.log("API call to update JSON file with (edit):", editingUser);
    setShowEditModal(false);
    setEditingUser({
      photo: "https://via.placeholder.com/150",
      name: "",
      mobile: "",
      email: "",
      status: "Active",
    });
  };

  // Delete user from the list using the user's unique id
  const handleDeleteClick = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      if (selectedTab === "members") {
        const updatedMembers = members.filter((user) => user.id !== userId);
        setMembers(updatedMembers);
      } else {
        const updatedAdmins = admins.filter((user) => user.id !== userId);
        setAdmins(updatedAdmins);
      }
      toast.success("User deleted successfully!");
      console.log("API call to delete user with id:", userId);
    }
  };

  // Handle filter checkbox changes
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilter((prev) => ({ ...prev, [name]: checked }));
  };

  // Apply filter and close modal (reset to page 1)
  const applyFilter = () => {
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16 flex">
      <Toaster position="top-right" />
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
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
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
                      <li
                        onClick={handleAddUser}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
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
              <button
                onClick={() => setShowFilterModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-8 mb-4 text-gray-700">
            <div>Total users: {filteredData.length}</div>
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
                {paginatedData.map((user) => (
                  <tr
                    key={user.id}
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
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
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

          {/* Pagination */}
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

      {/* Modal Popup for Adding a New User */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl mb-4">Add New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={newUser.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={newUser.photo}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Popup for Editing a User */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={editingUser.mobile}
                  onChange={handleEditInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  value={editingUser.photo}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={editingUser.status}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Popup for Filtering */}
      {showFilterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl mb-4">Filter Users</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="Active"
                  checked={filter.Active}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Active
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="Inactive"
                  checked={filter.Inactive}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyFilter}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
