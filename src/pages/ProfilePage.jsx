import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBook, FaHistory, FaCamera, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaBars, FaChevronDown } from 'react-icons/fa';

function ProfilePage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  // Mock user data - in a real app this would come from an API or context
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    address: '123 Main Street, New York, NY 10001',
    dob: '1990-01-01',
    socialMedia: {
      facebook: 'johndoe',
      twitter: 'johndoe',
      linkedin: 'johndoe',
      instagram: 'johndoe'
    },
    courses: [
      { id: 1, name: 'Python Programming', progress: 75 },
      { id: 2, name: 'Web Development', progress: 50 },
      { id: 3, name: 'Data Structures', progress: 90 }
    ],
    loginActivity: {
      firstLogin: '2023-01-01 09:30 AM',
      lastLogin: '2024-04-02 10:15 AM'
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setDropdownOpen(false);
  };

  // Navigation navbar items
  const navItems = [
    { id: 'profile', label: 'Profile Info', icon: <FaUser size={18} /> },
    { id: 'password', label: 'Change Password', icon: <FaLock size={18} /> },
    { id: 'courses', label: 'Course Details', icon: <FaBook size={18} /> },
    { id: 'activity', label: 'Login Activity', icon: <FaHistory size={18} /> }
  ];

  // Profile Info Section
  const ProfileInfoSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img 
            src={userData.photoUrl} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white">
            <FaCamera size={16} />
          </button>
        </div>
        <p className="mt-4 text-lg font-semibold">{userData.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              value={userData.name} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              value={userData.email} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <textarea 
              value={userData.address} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input 
              type="date" 
              value={userData.dob} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Social Media</label>
            
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 mr-2" />
              <input 
                type="text" 
                value={userData.socialMedia.facebook} 
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Facebook username"
              />
            </div>
            
            <div className="flex items-center">
              <FaTwitter className="text-blue-400 mr-2" />
              <input 
                type="text" 
                value={userData.socialMedia.twitter} 
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Twitter username"
              />
            </div>
            
            <div className="flex items-center">
              <FaLinkedin className="text-blue-700 mr-2" />
              <input 
                type="text" 
                value={userData.socialMedia.linkedin} 
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="LinkedIn username"
              />
            </div>
            
            <div className="flex items-center">
              <FaInstagram className="text-pink-600 mr-2" />
              <input 
                type="text" 
                value={userData.socialMedia.instagram} 
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Instagram username"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  // Change Password Section
  const ChangePasswordSection = () => (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input 
            type="password" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter your current password"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input 
            type="password" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter new password"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input 
            type="password" 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Confirm new password"
          />
        </div>
        
        <div>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  // Course Details Section
  const CourseDetailsSection = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Details</h2>
      
      <div className="space-y-6">
        {userData.courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.name}</h3>
            
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Progress:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View Details
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Continue Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Login Activity Section
  const LoginActivitySection = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Login Activity</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">First Login</h3>
            <p className="text-gray-600 dark:text-gray-400">{userData.loginActivity.firstLogin}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Last Login</h3>
            <p className="text-gray-600 dark:text-gray-400">{userData.loginActivity.lastLogin}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Activity</h3>
          <p className="text-gray-600 dark:text-gray-400">No unusual activity detected.</p>
        </div>
      </div>
    </div>
  );

  // Render active section content
  const renderSectionContent = () => {
    switch(activeSection) {
      case 'profile':
        return <ProfileInfoSection />;
      case 'password':
        return <ChangePasswordSection />;
      case 'courses':
        return <CourseDetailsSection />;
      case 'activity':
        return <LoginActivitySection />;
      default:
        return <ProfileInfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="flex items-center justify-between p-4">
            {/* User Info - Always visible */}
            <div className="flex items-center">
              <img 
                src={userData.photoUrl} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 mr-3" 
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{userData.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{userData.email}</p>
              </div>
            </div>
            
            {/* Dropdown for Mobile / Small Screens */}
            <div className="sm:hidden relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm"
              >
                <FaBars size={18} />
              </button>
              
              {dropdownOpen && (
                <div className="fixed right-4 top-24 w-52 bg-white dark:bg-gray-800 rounded-md shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        activeSection === item.id 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => handleSectionChange(item.id)}
                    >
                      <span className="mr-3 text-blue-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Regular Navigation for Desktop / Larger Screens */}
            <nav className="hidden sm:flex flex-wrap justify-end space-x-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderSectionContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
