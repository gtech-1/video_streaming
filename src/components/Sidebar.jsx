import { useState } from "react";
import { FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isSidebarOpen }) => {
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          key="sidebar"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-16 left-0 w-64 bg-gray-900 text-white h-[calc(100vh-64px)] pb-4 px-4 flex flex-col z-50"
        >
          <div className="overflow-y-auto flex-1 mt-2">
            <nav className="space-y-1">
              <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <FaHome className="mr-3" /> Home
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <HiOutlineViewGrid className="mr-3" /> Dashboard
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <IoMdListBox className="mr-3" /> Menu Page
              </a>
              <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                <FaUsers className="mr-3" /> User List
              </a>

              {/* User Management */}
              <div>
                <button
                  onClick={() => setUserMgmtOpen(!userMgmtOpen)}
                  className="flex justify-between w-full px-3 py-2 rounded hover:bg-gray-700"
                >
                  <span className="flex items-center">
                    <FaUsers className="mr-3" /> User Management
                  </span>
                  {userMgmtOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {userMgmtOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-2 overflow-hidden"
                    >
                      <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                        View All Users
                      </a>
                      <div>
                        <button
                          onClick={() => setEditUserOpen(!editUserOpen)}
                          className="flex justify-between w-full px-3 py-2 rounded hover:bg-gray-700"
                        >
                          <span className="flex items-center">
                            <FaUserEdit className="mr-3" /> Edit User Details
                          </span>
                          {editUserOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        <AnimatePresence>
                          {editUserOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 space-y-2 overflow-hidden"
                            >
                              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                                Edit Name
                              </a>
                              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                                Edit Email
                              </a>
                              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                                Edit Role
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                        <FaUserMinus className="mr-3" /> Delete Users
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Roles Management */}
              <div>
                <button
                  onClick={() => setRolesMgmtOpen(!rolesMgmtOpen)}
                  className="flex justify-between w-full px-3 py-2 rounded hover:bg-gray-700"
                >
                  <span className="flex items-center">
                    <FaUserEdit className="mr-3" /> Roles Management
                  </span>
                  {rolesMgmtOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {rolesMgmtOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-2 overflow-hidden"
                    >
                      <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                        Edit or Update Roles
                      </a>
                      <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                        Remove Roles
                      </a>
                      <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                        Assign Roles to Users
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
