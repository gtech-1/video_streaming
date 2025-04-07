import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
  FaBars,
  FaSignOutAlt,
  FaPencilAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

// Import initial user data from JSON file
import initialUserData from '../components/ProfileInfo.json';
// Import banner image
import bannerImage from '../assets/banner.jpg';

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
  // Track which field is being edited
  const [editingField, setEditingField] = useState(null);
  
  // Temporary state for edited values
  const [editValues, setEditValues] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  // Initialize edit values when a field is set to edit mode
  const handleEditClick = (field) => {
    setEditValues({
      ...editValues,
      [field]: field === 'socialMedia' ? {...profileData.socialMedia} : profileData[field]
    });
    setEditingField(field);
  };

  // Handle input changes
  const handleInputChange = (e, field, subfield = null) => {
    if (subfield) {
      setEditValues(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [subfield]: e.target.value
        }
      }));
    } else {
      setEditValues(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  // Save the edited field
  const handleSaveField = (field) => {
    setProfileData(prev => ({
      ...prev,
      ...(field === 'socialMedia' 
        ? { socialMedia: editValues.socialMedia } 
        : { [field]: editValues[field] })
    }));
    
    setEditingField(null);
    toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
  };

  // Cancel editing
  const handleCancelEdit = () => setEditingField(null);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, photoUrl: imageUrl }));
      toast.success("Profile picture updated successfully!");
    }
  };

  // Render an editable field section
  const renderFieldSection = (field, title, inputType = 'text', inputProps = {}) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        {editingField !== field && (
          <button 
            onClick={() => handleEditClick(field)} 
            className="text-blue-600 dark:text-blue-400"
          >
            <FaPencilAlt size={14} className="sm:text-base" />
          </button>
        )}
      </div>
      
      {editingField === field ? (
        <div className="mt-2">
          {inputType === 'textarea' ? (
            <textarea 
              value={editValues[field]}
              onChange={(e) => handleInputChange(e, field)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              rows="3"
              {...inputProps}
            />
          ) : (
            <input 
              type={inputType}
              value={editValues[field]}
              onChange={(e) => handleInputChange(e, field)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              {...inputProps}
            />
          )}
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={() => handleSaveField(field)}
              className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1 bg-green-500 text-white rounded-md text-xs sm:text-sm"
            >
              <FaCheck className="mr-1" size={10} /> Save
            </button>
            <button 
              onClick={handleCancelEdit}
              className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded-md text-xs sm:text-sm"
            >
              <FaTimes className="mr-1" size={10} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm sm:text-base">
          {field === 'phone' ? (profileData[field] || "+1 (234) 567-8901") : profileData[field]}
        </p>
      )}
    </div>
  );

  // Render social media section
  const renderSocialMediaSection = () => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Social Media</h3>
        {editingField !== 'socialMedia' && (
          <button 
            onClick={() => handleEditClick('socialMedia')} 
            className="text-blue-600 dark:text-blue-400"
          >
            <FaPencilAlt size={14} className="sm:text-base" />
          </button>
        )}
      </div>
      
      {editingField === 'socialMedia' ? (
        <div className="mt-2 space-y-2 sm:space-y-3">
          {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
            <div key={platform} className="flex items-center">
              {platform === 'facebook' && <FaFacebook className="text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'twitter' && <FaTwitter className="text-blue-400 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'linkedin' && <FaLinkedin className="text-blue-700 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'instagram' && <FaInstagram className="text-pink-600 text-lg sm:text-xl mr-2 sm:mr-3" />}
              <input 
                type="text" 
                value={editValues.socialMedia[platform]}
                onChange={(e) => handleInputChange(e, 'socialMedia', platform)}
                className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
              />
            </div>
          ))}
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={() => handleSaveField('socialMedia')}
              className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1 bg-green-500 text-white rounded-md text-xs sm:text-sm"
            >
              <FaCheck className="mr-1" size={10} /> Save
            </button>
            <button 
              onClick={handleCancelEdit}
              className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded-md text-xs sm:text-sm"
            >
              <FaTimes className="mr-1" size={10} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
            <div key={platform} className="flex items-center">
              {platform === 'facebook' && <FaFacebook className="text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'twitter' && <FaTwitter className="text-blue-400 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'linkedin' && <FaLinkedin className="text-blue-700 text-lg sm:text-xl mr-2 sm:mr-3" />}
              {platform === 'instagram' && <FaInstagram className="text-pink-600 text-lg sm:text-xl mr-2 sm:mr-3" />}
              <a 
                href={profileData.socialMedia[platform]} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base"
              >
                {profileData.socialMedia[platform] || 'Not connected'}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Profile Information</h2>
      
      {/* Profile Photo Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Profile photo</h3>
        </div>
        <div className="flex items-center">
          <div className="mr-3 sm:mr-4">
            <img 
              src={profileData.photoUrl} 
              alt="Profile" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          </div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white text-xs sm:text-sm rounded-md transition-colors"
          >
            Update
          </button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handlePictureChange} 
            className="hidden"
          />
        </div>
      </div>

      {/* Render all field sections using the helper function */}
      {renderFieldSection('name', 'Full Name')}
      {renderFieldSection('email', 'Email address', 'email')}
      {renderFieldSection('address', 'Address', 'textarea')}
      {renderFieldSection('phone', 'Phone number', 'tel')}
      {renderFieldSection('dob', 'Date of Birth', 'date')}
      
      {/* Render social media section */}
      {renderSocialMediaSection()}
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
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Change Password</h2>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input 
            type="password" 
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
            placeholder="Enter your current password"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input 
            type="password" 
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input 
            type="password" 
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
            placeholder="Confirm new password"
          />
        </div>
        <div>
          <button 
            onClick={handleUpdatePassword}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm sm:text-base"
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
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Course Details</h2>
    <div className="space-y-4 sm:space-y-6">
      {profileData.courses.map(course => (
        <div key={course.id} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{course.name}</h3>
          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mr-2">Progress:</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
                <div 
                  className="bg-blue-600 h-2 sm:h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{course.progress}%</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex space-x-2">
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View Details
            </button>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Login Activity</h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">First Login</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{profileData.loginActivity.firstLogin}</p>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Last Login</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{profileData.loginActivity.lastLogin}</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Recent Activity</h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">No unusual activity detected.</p>
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
  const navigate = useNavigate();

  // Use the custom hook instead of the previous effect
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setDropdownOpen(false);
  };

  const handleSignOut = () => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Display success notification
    toast.success("Signed out successfully!");
    // Navigate to home page/login page
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const navItems = [
    { id: 'profile', label: 'Profile', icon: <FaUser size={16} /> },
    { id: 'password', label: 'Security', icon: <FaLock size={16} /> },
    { id: 'courses', label: 'Courses', icon: <FaBook size={16} /> },
    { id: 'activity', label: 'Metrics', icon: <FaHistory size={16} /> }
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 -mt-1">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Banner Section */}
        <div className="relative">
          {/* Banner Image */}
          <div className="w-full h-32 sm:h-40 md:h-60 overflow-hidden rounded-t-xl">
            <img 
              src={bannerImage} 
              alt="Profile Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Photo - removed edit button */}
          <div className="absolute -bottom-10 sm:-bottom-12 md:-bottom-16 left-2 sm:left-4 md:left-8">
            <div className="relative">
              <img 
                src={profileData.photoUrl} 
                alt="Profile" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
          </div>
          
          {/* Sign Out Button - Half Sticking Out */}
          <div className="absolute -bottom-12 sm:-bottom-14 right-2 sm:right-4 md:right-8">
            <button 
              onClick={handleSignOut}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-xs sm:text-sm font-medium rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center border border-gray-200 dark:border-gray-700"
            >
              <FaSignOutAlt className="mr-1" /> Sign out
            </button>
          </div>
        </div>
        
        {/* Profile Info, Navigation and Content - All in one container */}
        <div className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">
          {/* User Info - removed Active tag */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {profileData.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {profileData.email}
              </p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="flex space-x-2 sm:space-x-4 md:space-x-8 pb-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`pb-2 px-1 flex items-center text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === item.id 
                      ? 'text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <span className="mr-1 sm:mr-1.5 md:mr-2">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="py-4 sm:py-6">
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