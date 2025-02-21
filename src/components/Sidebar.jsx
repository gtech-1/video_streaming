import { useState, useEffect, useRef } from "react";
import { FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { motion } from "framer-motion";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Detect clicks outside the sidebar and close it
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ width: isSidebarOpen ? 200 : 60 }}
      animate={{ width: isSidebarOpen ? 200 : 60 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className="fixed top-16 left-0 bg-gray-900 text-white h-[calc(100vh-64px)] pb-3 flex flex-col z-50"
    >
      <div className="overflow-y-auto flex-1 mt-2 px-2">
        <nav className="space-y-1">
          <NavItem icon={<FaHome size={18} />} text="Home" isSidebarOpen={isSidebarOpen} />
          <NavItem icon={<HiOutlineViewGrid size={18} />} text="Dashboard" isSidebarOpen={isSidebarOpen} />
          <NavItem icon={<IoMdListBox size={18} />} text="Menu Page" isSidebarOpen={isSidebarOpen} />
          <NavItem icon={<FaUsers size={18} />} text="User List" isSidebarOpen={isSidebarOpen} />

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
            <SubNavItem icon={<FaUserMinus size={14} />} text="Delete Users" />
          </DropdownItem>

          {/* Roles Management */}
          <DropdownItem
            icon={<FaUserEdit size={16} />}
            text="Roles Mgmt"
            isSidebarOpen={isSidebarOpen}
            isOpen={rolesMgmtOpen}
            toggleOpen={() => setRolesMgmtOpen(!rolesMgmtOpen)}
          >
            <SubNavItem text="Update Roles" />
            <SubNavItem text="Remove Roles" />
            <SubNavItem text="Assign Roles" />
          </DropdownItem>
        </nav>
      </div>
    </motion.div>
  );
};

const NavItem = ({ icon, text, isSidebarOpen }) => (
  <a
    href="#"
    className={`flex items-center p-[6px] rounded hover:bg-gray-700 transition-all ${
      isSidebarOpen ? "justify-start" : "justify-center"
    }`}
  >
    <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    {isSidebarOpen && <span className="ml-3 text-[15px]">{text}</span>}
  </a>
);

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

const SubNavItem = ({ icon, text }) => (
  <a href="#" className="flex items-center p-[5px] rounded hover:bg-gray-700 transition-all">
    {icon && <div className="w-5 h-5 flex items-center justify-center">{icon}</div>}
    <span className="text-[14px] ml-2">{text}</span>
  </a>
);

export default Sidebar;
