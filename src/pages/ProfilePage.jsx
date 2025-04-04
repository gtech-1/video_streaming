import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  FaUser,
  FaLock,
  FaBook,
  FaHistory,
  FaCamera,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaBars
} from 'react-icons/fa';

// Import initial user data from JSON file
import initialUserData from '../components/ProfileInfo.json';

// Custom hook for handling outside clicks
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

// ============== ProfileInfoSection Component ==============
const ProfileInfoSection = ({ profileData, setProfileData, initialUserData, fileInputRef }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value }
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, photoUrl: imageUrl }));
    }
  };

  const handleSaveChanges = () => {
    console.log("Profile updated:", profileData);
    toast.success("Profile info saved successfully!");
  };

  const handleResetProfile = () => {
    if (window.confirm("Are you sure you want to reset your profile info?")) {
      setProfileData(initialUserData);
      toast.success("Profile information has been reset");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img 
            src={profileData.photoUrl} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white"
          >
            <FaCamera size={16} />
          </button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handlePictureChange} 
            className="hidden"
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          {profileData.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={profileData.name} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              name="email"
              value={profileData.email} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
            <textarea 
              name="address"
              value={profileData.address} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input 
              type="date" 
              name="dob"
              value={profileData.dob} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Social Media</label>

            <div className="flex items-center">
              <FaFacebook className="text-blue-600 mr-2" />
              <input 
                type="text" 
                name="facebook"
                value={profileData.socialMedia.facebook} 
                onChange={handleSocialChange}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Facebook username"
              />
            </div>

            <div className="flex items-center">
              <FaTwitter className="text-blue-400 mr-2" />
              <input 
                type="text" 
                name="twitter"
                value={profileData.socialMedia.twitter} 
                onChange={handleSocialChange}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Twitter username"
              />
            </div>

            <div className="flex items-center">
              <FaLinkedin className="text-blue-700 mr-2" />
              <input 
                type="text" 
                name="linkedin"
                value={profileData.socialMedia.linkedin} 
                onChange={handleSocialChange}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="LinkedIn username"
              />
            </div>

            <div className="flex items-center">
              <FaInstagram className="text-pink-600 mr-2" />
              <input 
                type="text" 
                name="instagram"
                value={profileData.socialMedia.instagram} 
                onChange={handleSocialChange}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Instagram username"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button 
          onClick={handleResetProfile}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors"
        >
          Reset Info
        </button>
        <button 
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// ============== ChangePasswordSection Component ==============
const ChangePasswordSection = ({ passwordData, setPasswordData }) => {
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;
    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }
    console.log("Password updated:", passwordData);
    toast.success("Password updated successfully!");
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input 
            type="password" 
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter your current password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input 
            type="password" 
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input 
            type="password" 
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Confirm new password"
          />
        </div>
        <div>
          <button 
            onClick={handleUpdatePassword}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

// ============== CourseDetailsSection Component ==============
const CourseDetailsSection = ({ profileData }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Details</h2>
    <div className="space-y-6">
      {profileData.courses.map(course => (
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

// ============== LoginActivitySection Component ==============
const LoginActivitySection = ({ profileData }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Login Activity</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">First Login</h3>
          <p className="text-gray-600 dark:text-gray-400">{profileData.loginActivity.firstLogin}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Last Login</h3>
          <p className="text-gray-600 dark:text-gray-400">{profileData.loginActivity.lastLogin}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Activity</h3>
        <p className="text-gray-600 dark:text-gray-400">No unusual activity detected.</p>
      </div>
    </div>
  </div>
);

// ============== Main ProfilePage Component ==============
function ProfilePage() {
  const [profileData, setProfileData] = useState(initialUserData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [activeSection, setActiveSection] = useState('profile');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Use the custom hook instead of the previous effect
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setDropdownOpen(false);
  };

  const navItems = [
    { id: 'profile', label: 'Profile Info', icon: <FaUser size={18} /> },
    { id: 'password', label: 'Change Password', icon: <FaLock size={18} /> },
    { id: 'courses', label: 'Course Details', icon: <FaBook size={18} /> },
    { id: 'activity', label: 'Login Activity', icon: <FaHistory size={18} /> }
  ];

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <ProfileInfoSection
            profileData={profileData}
            setProfileData={setProfileData}
            initialUserData={initialUserData}
            fileInputRef={fileInputRef}
          />
        );
      case 'password':
        return (
          <ChangePasswordSection
            passwordData={passwordData}
            setPasswordData={setPasswordData}
          />
        );
      case 'courses':
        return <CourseDetailsSection profileData={profileData} />;
      case 'activity':
        return <LoginActivitySection profileData={profileData} />;
      default:
        return (
          <ProfileInfoSection
            profileData={profileData}
            setProfileData={setProfileData}
            initialUserData={initialUserData}
            fileInputRef={fileInputRef}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <img 
                src={profileData.photoUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 mr-2" 
              />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{profileData.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{profileData.email}</p>
              </div>
            </div>
            <div className="sm:hidden relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center p-2 text-gray-700 dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FaBars size={18} />
              </button>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="fixed right-4 top-24 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <ul className="py-1">
                    {navItems.map(item => (
                      <li key={item.id}>
                        <button
                          className={`flex items-center w-full px-4 py-1.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            activeSection === item.id 
                              ? 'text-blue-600 dark:text-blue-400 font-medium' 
                              : 'text-gray-700 dark:text-white'
                          }`}
                          onClick={() => handleSectionChange(item.id)}
                        >
                          <span className="mr-3 text-blue-500">{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
            <nav className="hidden sm:flex flex-wrap justify-end space-x-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
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