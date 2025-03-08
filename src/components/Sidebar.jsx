import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for routing
import { FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { motion } from "framer-motion";
import { LuUsers } from "react-icons/lu";
import { FaBuildingUser } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";
import { MdNoAccounts, MdManageAccounts } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ width: isSidebarOpen ? 250 : 60 }}
      animate={{ width: isSidebarOpen ? 250 : 60 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className={`fixed top-[56px] left-0 bottom-0 bg-gray-900 text-white pb-3 z-50 ${
        !isSidebarOpen ? "hidden sm:flex" : "flex"
      } flex-col`}
    >
      <div className="overflow-y-auto flex-1 mt-2 px-2">
        <nav className="space-y-1">
          {/* ✅ Updated Navigation Links */}
          <NavItem icon={<FaHome size={18} />} text="HomePage" isSidebarOpen={isSidebarOpen} path="/home/homepage" />
          <NavItem icon={<HiOutlineViewGrid size={18} />} text="Dashboard" isSidebarOpen={isSidebarOpen} path="/home/Dashboard" />
          <NavItem icon={<IoMdListBox size={18} />} text="Menu Page" isSidebarOpen={isSidebarOpen} path="/home/menu" />
          <NavItem icon={<LuUsers size={18} />} text="User List" isSidebarOpen={isSidebarOpen} path="/home/userlist" />

          {/* User Management */}
          <DropdownItem
            icon={<FaUsers size={16} />}
            text="User Mgmt"
            isSidebarOpen={isSidebarOpen}
            isOpen={userMgmtOpen}
            toggleOpen={() => setUserMgmtOpen(!userMgmtOpen)}
          >
            <SubNavItem text="View Users" />
            <DropdownItem
              icon={<FaUserEdit size={14} />}
              text="Edit User"
              isSidebarOpen={isSidebarOpen}
              isOpen={editUserOpen}
              toggleOpen={() => setEditUserOpen(!editUserOpen)}
            >
              <SubNavItem text="Edit Name" />
              <SubNavItem text="Edit Email" />
              <SubNavItem text="Edit Role" />
            </DropdownItem>
            <SubNavItem icon={<FaUserMinus size={14} />} text="Delete User" />
          </DropdownItem>

          {/* Roles Management */}
          <DropdownItem
            icon={<FaBuildingUser size={16} />}
            text="Roles Mgmt"
            isSidebarOpen={isSidebarOpen}
            isOpen={rolesMgmtOpen}
            toggleOpen={() => setRolesMgmtOpen(!rolesMgmtOpen)}
          >
            <SubNavItem icon={<MdManageAccounts size={15} />} text="Update Roles" />
            <SubNavItem icon={<MdNoAccounts size={15} />} text="Remove Roles" />
            <SubNavItem icon={<FaIdBadge size={15} />} text="Assign Roles" />
          </DropdownItem>
        </nav>
      </div>
    </motion.div>
  );
};

// ✅ Updated NavItem Component with Link
const NavItem = ({ icon, text, isSidebarOpen, path }) => (
  <Link
    to={path}
    className={`flex items-center p-[6px] rounded hover:bg-gray-700 transition-all ${
      isSidebarOpen ? "justify-start" : "justify-center"
    }`}
  >
    <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    {isSidebarOpen && <span className="ml-3 text-[15px]">{text}</span>}
  </Link>
);

// Dropdown Component
const DropdownItem = ({ icon, text, isSidebarOpen, isOpen, toggleOpen, children }) => (
  <div className="mb-[1px]">
    <button
      onClick={toggleOpen}
      className={`flex items-center w-full p-[6px] rounded hover:bg-gray-700 transition-all ${
        isSidebarOpen ? "justify-start" : "justify-center"
      }`}
    >
      <div className="flex items-center">
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        {isSidebarOpen && <span className="ml-3 text-[15px]">{text}</span>}
      </div>
      {isSidebarOpen && (
        <span className="ml-auto flex items-center justify-center">
          {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </span>
      )}
    </button>
    {isSidebarOpen && isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0 }}
        className="ml-4 space-y-[2px] overflow-hidden"
      >
        {children}
      </motion.div>
    )}
  </div>
);

// Sub Navigation Item
const SubNavItem = ({ icon, text }) => (
  <div className="flex items-center p-[5px] rounded hover:bg-gray-700 transition-all">
    {icon && <div className="w-5 h-5 flex items-center justify-center">{icon}</div>}
    <span className="text-[14px] ml-2">{text}</span>
  </div>
);

export default Sidebar;
