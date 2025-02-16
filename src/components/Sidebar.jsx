import { useState } from "react";
import { FaBars, FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <div className="relative">
      {/* Collapsed Sidebar */}
      {!isOpen && (
        <div className="absolute top-2 left-4 flex items-center z-50">
          <button className="text-black bg-white p-2 rounded-full" onClick={() => setIsOpen(true)}>
            <FaBars size={20} />
          </button>
          <img src={logo} alt="Logo" className="ml-2 h-10" />
        </div>
      )}

      {/* Expanded Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white h-full pb-4 px-4 flex flex-col transition-all duration-300 z-50">
          <div className="flex items-center sticky top-0 z-10 bg-gray-900 p-3 px-0">
            <button className="text-white" onClick={() => setIsOpen(false)}>
              <FaBars size={20} />
            </button>
            <img src={logo} alt="Logo" className="ml-3 h-10" />
          </div>

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
                {userMgmtOpen && (
                  <div className="ml-4 space-y-2">
                    <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                      View All Users
                    </a>

                    {/* Edit User Details */}
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
                      {editUserOpen && (
                        <div className="ml-4 space-y-2">
                          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                            Edit Name
                          </a>
                          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                            Edit Email
                          </a>
                          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                            Edit Role
                          </a>
                        </div>
                      )}
                    </div>

                    <a href="#" className="flex items-center px-3 py-2 rounded hover:bg-gray-700">
                      <FaUserMinus className="mr-3" /> Delete Users
                    </a>
                  </div>
                )}
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
                {rolesMgmtOpen && (
                  <div className="ml-4 space-y-2">
                    <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                      Edit or Update Roles
                    </a>
                    <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                      Remove Roles
                    </a>
                    <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                      Assign Roles to Users
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
