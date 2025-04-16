import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdListBox } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { LuUsers } from "react-icons/lu";
import { FaBuildingUser } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";
import { MdNoAccounts, MdManageAccounts } from "react-icons/md";
import { useSelector } from "react-redux";

// Custom hook to detect desktop (≥1280px)
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const isDesktop = useIsDesktop();
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [rolesMgmtOpen, setRolesMgmtOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const sidebarRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Determine sidebar container classes based on theme
  const sidebarBg = darkMode ? "bg-gray-800" : "bg-gray-200";
  const textColor = darkMode ? "text-white" : "text-gray-900";

  // Compute variants based on whether we're on desktop or mobile.
  const variants = isDesktop
    ? {
        open: {
          x: 0,
          width: 250,
          transition: { type: "spring", stiffness: 250, damping: 25 },
        },
        closed: {
          x: 0,
          width: 60,
          transition: { type: "spring", stiffness: 250, damping: 25 },
        },
      }
    : {
        open: {
          x: 0,
          width: 250,
          transition: { type: "spring", stiffness: 250, damping: 30, bounce: 0 },
        },
        closed: {
          x: -250,
          width: 60,
          transition: { type: "spring", stiffness: 250, damping: 30, bounce: 0 },
        },
      };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // On mobile (<640px), close sidebar if clicked outside
      if (window.innerWidth < 640) {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          isSidebarOpen
        ) {
          toggleSidebar();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  // On mobile, if sidebar is closed, let AnimatePresence handle the exit.
  // On desktop, always render the sidebar.
  if (!isDesktop && !isSidebarOpen) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={sidebarRef}
          initial="open"
          animate="closed"
          exit="closed"
          variants={variants}
          className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
        >
          <SidebarContent
            darkMode={darkMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            userMgmtOpen={userMgmtOpen}
            setUserMgmtOpen={setUserMgmtOpen}
            rolesMgmtOpen={rolesMgmtOpen}
            setRolesMgmtOpen={setRolesMgmtOpen}
            editUserOpen={editUserOpen}
            setEditUserOpen={setEditUserOpen}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return isDesktop ? (
    <motion.div
      ref={sidebarRef}
      initial={false}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={variants}
      className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
    >
      <SidebarContent
        darkMode={darkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userMgmtOpen={userMgmtOpen}
        setUserMgmtOpen={setUserMgmtOpen}
        rolesMgmtOpen={rolesMgmtOpen}
        setRolesMgmtOpen={setRolesMgmtOpen}
        editUserOpen={editUserOpen}
        setEditUserOpen={setEditUserOpen}
      />
    </motion.div>
  ) : (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          className={`fixed top-[56px] left-0 bottom-0 ${sidebarBg} ${textColor} pb-3 z-50 flex flex-col`}
        >
          <SidebarContent
            darkMode={darkMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            userMgmtOpen={userMgmtOpen}
            setUserMgmtOpen={setUserMgmtOpen}
            rolesMgmtOpen={rolesMgmtOpen}
            setRolesMgmtOpen={setRolesMgmtOpen}
            editUserOpen={editUserOpen}
            setEditUserOpen={setEditUserOpen}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SidebarContent = ({
  darkMode,
  isSidebarOpen,
  toggleSidebar,
  userMgmtOpen,
  setUserMgmtOpen,
  rolesMgmtOpen,
  setRolesMgmtOpen,
  editUserOpen,
  setEditUserOpen,
}) => {
  return (
    <div className="overflow-y-auto flex-1 mt-2 px-2">
      <nav className="space-y-1">
        <NavItem
          darkMode={darkMode}
          icon={<HiOutlineViewGrid size={18} />}
          text="Dashboard"
          isSidebarOpen={isSidebarOpen}
          path="/home/dashboard"
          toggleSidebar={toggleSidebar}
        />
        <NavItem
          darkMode={darkMode}
          icon={<IoMdListBox size={18} />}
          text="Menu Page"
          isSidebarOpen={isSidebarOpen}
          path="/home/menu"
          toggleSidebar={toggleSidebar}
        />
        <NavItem
          darkMode={darkMode}
          icon={<LuUsers size={18} />}
          text="User List"
          isSidebarOpen={isSidebarOpen}
          path="/home/userlist"
          toggleSidebar={toggleSidebar}
        />
        <DropdownItem
          darkMode={darkMode}
          icon={<FaUsers size={16} />}
          text="User Mgmt"
          isSidebarOpen={isSidebarOpen}
          isOpen={userMgmtOpen}
          toggleOpen={() => setUserMgmtOpen(!userMgmtOpen)}
        >
          <SubNavItem
            darkMode={darkMode}
            text="View Users"
            toggleSidebar={toggleSidebar}
            path="/home/userview"
          />
          <DropdownItem
            darkMode={darkMode}
            icon={<FaUserEdit size={14} />}
            text="Edit User"
            isSidebarOpen={isSidebarOpen}
            isOpen={editUserOpen}
            toggleOpen={() => setEditUserOpen(!editUserOpen)}
          >
            <SubNavItem
              darkMode={darkMode}
              text="Edit Name"
              toggleSidebar={toggleSidebar}
              path="/home/editname"
            />
            <SubNavItem
              darkMode={darkMode}
              text="Edit Email"
              toggleSidebar={toggleSidebar}
              path="/home/editemail"
            />
            <SubNavItem
              darkMode={darkMode}
              text="Edit Role"
              toggleSidebar={toggleSidebar}
              path="/home/editrole"
            />
          </DropdownItem>
          <SubNavItem
            darkMode={darkMode}
            icon={<FaUserMinus size={14} />}
            text="Delete User"
            toggleSidebar={toggleSidebar}
            path="/home/deleteuser"
          />
        </DropdownItem>
        <DropdownItem
          darkMode={darkMode}
          icon={<FaBuildingUser size={16} />}
          text="Roles Mgmt"
          isSidebarOpen={isSidebarOpen}
          isOpen={rolesMgmtOpen}
          toggleOpen={() => setRolesMgmtOpen(!rolesMgmtOpen)}
        >
          <SubNavItem
            darkMode={darkMode}
            icon={<MdManageAccounts size={15} />}
            text="Update Roles"
            toggleSidebar={toggleSidebar}
            path="/home/updateroles"
          />
          <SubNavItem
            darkMode={darkMode}
            icon={<MdNoAccounts size={15} />}
            text="Remove Roles"
            toggleSidebar={toggleSidebar}
            path="/home/removeroles"
          />
          <SubNavItem
            darkMode={darkMode}
            icon={<FaIdBadge size={15} />}
            text="Assign Roles"
            toggleSidebar={toggleSidebar}
            path="/home/assignroles"
          />
        </DropdownItem>
      </nav>
    </div>
  );
};

const NavItem = ({ darkMode, icon, text, isSidebarOpen, path, toggleSidebar }) => {
  const handleClick = () => {
    if (window.innerWidth < 640 && toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center p-[6px] rounded transition-all ${
          isSidebarOpen ? "justify-start" : "justify-center"
        } ${
          isActive
            ? darkMode
              ? "bg-gray-700 border-l-4 border-gray-500"
              : "bg-gray-100 border-l-4 border-gray-400"
            : darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-300"
        }`
      }
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      {isSidebarOpen && <span className="ml-3 text-[15px]">{text}</span>}
    </NavLink>
  );
};

const SubNavItem = ({ darkMode, icon, text, toggleSidebar, path }) => {
  const handleClick = () => {
    if (window.innerWidth < 640 && toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center p-[5px] rounded transition-all ${
          isActive
            ? darkMode
              ? "bg-gray-700 border-l-4 border-gray-500"
              : "bg-gray-100 border-l-4 border-gray-400"
            : darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-300"
        }`
      }
    >
      {icon && (
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      )}
      <span className="text-[14px] ml-2">{text}</span>
    </NavLink>
  );
};

const DropdownItem = ({
  darkMode,
  icon,
  text,
  isSidebarOpen,
  isOpen,
  toggleOpen,
  children,
}) => (
  <div className="mb-[1px]">
    <button
      onClick={toggleOpen}
      className={`flex items-center w-full p-[6px] rounded transition-all ${
        isSidebarOpen ? "justify-start" : "justify-center"
      } ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
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
        transition={{ duration: 0.2 }}
        className="ml-4 space-y-[2px] overflow-hidden"
      >
        {children}
      </motion.div>
    )}
  </div>
);

export default Sidebar;
