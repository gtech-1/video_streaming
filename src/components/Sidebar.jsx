import { useState } from "react";
import { FaBars, FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import logo from "../assets/logo.png";

const Sidebar = ({ toggleSidebar, isOpen: propIsOpen }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || true);
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden bg-blue-500 text-white p-2 rounded-md z-50"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-500 text-white transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white">
          <img src={logo} alt="Logo" className="h-10" />
          <button className="text-white md:hidden" onClick={() => setIsOpen(false)}>
            ✖
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2 px-2">
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-2 border border-white rounded-md hover:bg-blue-600">
              <FaHome className="mr-3" /> Home
            </a>
            <a href="#" className="flex items-center px-4 py-2 border border-white rounded-md hover:bg-blue-600">
              <HiOutlineViewGrid className="mr-3" /> Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-2 border border-white rounded-md hover:bg-blue-600">
              <IoMdListBox className="mr-3" /> Menu Page
            </a>
            <a href="#" className="flex items-center px-4 py-2 border border-white rounded-md hover:bg-blue-600">
              <FaUsers className="mr-3" /> User List
            </a>

            {/* User Management */}
            <div>
              <button
                onClick={() => setUserMgmtOpen(!userMgmtOpen)}
                className="flex justify-between w-full px-4 py-2 border border-white rounded-md hover:bg-blue-600"
              >
                <span className="flex items-center">
                  <FaUsers className="mr-3" /> User Management
                </span>
                {userMgmtOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {userMgmtOpen && (
                <div className="ml-4 space-y-2">
                  <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                    View All Users
                  </a>

                  {/* Edit User Details */}
                  <div>
                    <button
                      onClick={() => setEditUserOpen(!editUserOpen)}
                      className="flex justify-between w-full px-4 py-2 border border-white rounded-md hover:bg-blue-600"
                    >
                      <span className="flex items-center">
                        <FaUserEdit className="mr-3" /> Edit User Details
                      </span>
                      {editUserOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    {editUserOpen && (
                      <div className="ml-4 space-y-2">
                        <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                          Edit Name
                        </a>
                        <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                          Edit Email
                        </a>
                        <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                          Edit Role
                        </a>
                      </div>
                    )}
                  </div>

                  <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                    <FaUserMinus className="mr-3" /> Delete Users
                  </a>
                </div>
              )}
            </div>

            {/* Roles Management */}
            <div>
              <button
                onClick={() => setRolesMgmtOpen(!rolesMgmtOpen)}
                className="flex justify-between w-full px-4 py-2 border border-white rounded-md hover:bg-blue-600"
              >
                <span className="flex items-center">
                  <FaUserEdit className="mr-3" /> Roles Management
                </span>
                {rolesMgmtOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {rolesMgmtOpen && (
                <div className="ml-4 space-y-2">
                  <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                    Edit or Update Roles
                  </a>
                  <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                    Remove Roles
                  </a>
                  <a href="#" className="block px-4 py-2 border border-white rounded-md hover:bg-blue-600">
                    Assign Roles to Users
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
