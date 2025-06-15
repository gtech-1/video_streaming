import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaUser,
  FaLock,
  FaBook,
  FaHistory,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSignOutAlt,
  FaPencilAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { authAPI } from '../services/api';

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
const ProfileInfoSection = ({ profileData, setProfileData }) => {
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Temporary state for edited values
  const [editValues, setEditValues] = useState({
    photoUrl: '',
    firstName: '',
    lastName: '',
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
    if (field === 'socialMedia') {
      setEditValues((prev) => ({
        ...prev,
        socialMedia: { ...profileData.socialMedia }
      }));
    } else if (field === 'photoUrl') {
      setEditValues((prev) => ({
        ...prev,
        photoUrl: profileData.photoUrl
      }));
    } else {
      setEditValues((prev) => ({
        ...prev,
        [field]: profileData[field]
      }));
    }
    setEditingField(field);
  };

  // Handle input changes
  const handleInputChange = (e, field, subfield = null) => {
    if (field === 'socialMedia' && subfield) {
      setEditValues((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [subfield]: e.target.value
        }
      }));
    } else {
      setEditValues((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  // Save the edited field
  const handleSaveField = async (field) => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...profileData,
        ...(field === 'socialMedia'
          ? { socialMedia: editValues.socialMedia }
          : { [field]: editValues[field] })
      };

      const response = await authAPI.updateProfile(updatedData);
      
      if (response.status === 200) {
        setProfileData(response.data.user);
        setEditingField(null);

        // For toast message, capitalize label
        let label;
        switch (field) {
          case 'photoUrl':
            label = 'Profile Picture URL';
            break;
          case 'firstName':
            label = 'First Name';
            break;
          case 'lastName':
            label = 'Last Name';
            break;
          default:
            label = field.charAt(0).toUpperCase() + field.slice(1);
        }
        toast.success(`${label} updated successfully!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingField(null);
  };

  // Render an editable field section
  const renderFieldSection = (
    field,
    title,
    inputType = 'text',
    inputProps = {}
  ) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
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
          {field === 'dob' && profileData[field] 
            ? new Date(profileData[field]).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })
            : profileData[field] || (field === 'phone' ? "+1 (234) 567-8901" : "")}
        </p>
      )}
    </div>
  );

  // Render social media section (same as before)
  const renderSocialMediaSection = () => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
          Social Media
        </h3>
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
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
            <div key={platform} className="flex items-center">
              {platform === 'facebook' && (
                <FaFacebook className="text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'twitter' && (
                <FaTwitter className="text-blue-400 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'linkedin' && (
                <FaLinkedin className="text-blue-700 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'instagram' && (
                <FaInstagram className="text-pink-600 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
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
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
            <div key={platform} className="flex items-center">
              {platform === 'facebook' && (
                <FaFacebook className="text-blue-600 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'twitter' && (
                <FaTwitter className="text-blue-400 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'linkedin' && (
                <FaLinkedin className="text-blue-700 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              {platform === 'instagram' && (
                <FaInstagram className="text-pink-600 text-lg sm:text-xl mr-2 sm:mr-3" />
              )}
              <a
                href={profileData.socialMedia[platform]}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
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
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        Profile Information
      </h2>

      {/* ====== Profile Photo Section (edited) ====== */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
            Profile Photo
          </h3>
          {editingField !== 'photoUrl' && (
            <button
              onClick={() => handleEditClick('photoUrl')}
              className="text-blue-600 dark:text-blue-400"
            >
              <FaPencilAlt size={14} className="sm:text-base" />
            </button>
          )}
        </div>
        {editingField === 'photoUrl' ? (
          <div className="mt-2">
            <input
              type="text"
              value={editValues.photoUrl}
              onChange={(e) => handleInputChange(e, 'photoUrl')}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Paste image URL here"
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleSaveField('photoUrl')}
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
          <div className="flex items-center">
            <div className="mr-3 sm:mr-4">
              <img
                src={profileData.photoUrl}
                alt="Profile"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* First Name and Last Name Sections */}
      {renderFieldSection('firstName', 'First Name')}
      {renderFieldSection('lastName', 'Last Name')}

      {/* Email, Address, Phone, DOB */}
      {renderFieldSection('email', 'Email address', 'email')}
      {renderFieldSection('address', 'Address', 'textarea')}
      {renderFieldSection('phone', 'Phone number', 'tel')}
      {renderFieldSection('dob', 'Date of Birth', 'date')}

      {/* Social Media Section */}
      {renderSocialMediaSection()}
    </div>
  );
};

// ============== ChangePasswordSection Component ==============
const ChangePasswordSection = ({ passwordData, setPasswordData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.updatePassword(passwordData);
      
      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        Change Password
      </h2>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Password
          </label>
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
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
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
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
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
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
      Course Details
    </h2>
    <div className="space-y-4 sm:space-y-6">
      {profileData.courses.map((course) => (
        <div key={course.id} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {course.name}
          </h3>
          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mr-2">
                Progress:
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5">
                <div
                  className="bg-blue-600 h-2 sm:h-2.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {course.progress}%
              </span>
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
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
      Login Activity
    </h2>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
            First Login
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {profileData.loginActivity.firstLogin}
          </p>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
            Last Login
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {profileData.loginActivity.lastLogin}
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Recent Activity
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          No unusual activity detected.
        </p>
      </div>
    </div>
  </div>
);

// ============== Main ProfilePage Component ==============
function ProfilePage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Define navigation items
  const navItems = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'password', label: 'Security', icon: <FaLock /> },
    { id: 'courses', label: 'Courses', icon: <FaBook /> },
    { id: 'activity', label: 'Metrics', icon: <FaHistory /> }
  ];

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Render section content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileInfoSection
            profileData={profileData}
            setProfileData={setProfileData}
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
          />
        );
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await authAPI.getProfile();
        console.log("Profile data fetched:", response.data);
        setProfileData(response.data);

      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch profile data");
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-3 sm:px-3 sm:py-3 -mt-1">
      <Toaster position="top-right" />

      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-2 sm:p-0">
        {/* Banner Section */}
        <div className="relative">
          {/* Banner Image */}
          <div className="w-full h-20 sm:h-32 md:h-60 overflow-hidden rounded-t-xl">
            <img
              src={bannerImage}
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Photo */}
          <div className="absolute -bottom-7 sm:-bottom-10 md:-bottom-16 left-1 sm:left-4 md:left-8">
            <div className="relative">
              <img
                src={profileData.photoUrl}
                alt="Profile"
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full object-cover border-2 sm:border-4 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="absolute -bottom-8 sm:-bottom-12 right-1 sm:right-4 md:right-8">
            <button
              onClick={handleSignOut}
              className="px-2.5 py-1 sm:px-3 sm:py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white text-xs sm:text-sm font-medium rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center border border-gray-200 dark:border-gray-700"
            >
              <FaSignOutAlt className="mr-1 sm:mr-1" size={13} />{' '}
              <span className="text-xs sm:text-xs">Sign out</span>
            </button>
          </div>
        </div>

        {/* Profile Info, Navigation and Content */}
        <div className="pt-10 sm:pt-16 md:pt-24 px-3 sm:px-6 md:px-8 pb-3 sm:pb-0">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 sm:mb-6">
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto pt-2 sm:pt-0 pb-2 sm:pb-1 mt-2 sm:mt-0 mb-2 sm:mb-0">
            <div className="flex justify-between sm:justify-start w-full sm:space-x-4 md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`py-2 sm:pb-2 px-1 sm:px-1 flex items-center justify-center text-[10px] sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    activeSection === item.id
                      ? 'text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <span className="mr-0.5 sm:mr-1.5 md:mr-2">
                    {React.cloneElement(item.icon, {
                      size:
                        window.innerWidth < 350
                          ? 12
                          : window.innerWidth < 400
                          ? 15
                          : 16
                    })}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="py-3 sm:py-6">
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
