import React, { useState } from "react";
import axios from "axios";
import { FiBriefcase } from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganisationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setLogoPreview(previewURL);
      } else {
        setLogoPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("description", formData.description);
    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    try {
      await axios.post("/api/organizations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Organisation sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        logo: null,
      });
      setLogoPreview(null);
    } catch (err) {
      console.error("Error creating organisation:", err);
      toast.error("Failed to send organisation. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 overflow-x-hidden"
    >
      <ToastContainer />
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto transition-all duration-300">
        {/* Header */}
        <div className="flex items-center mb-8">
          {/* Always blue, both light & dark */}
          <FiBriefcase className="text-2xl text-blue-500 mr-2 flex-shrink-0" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
            Organisation Details
          </h2>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-gray-900"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organisation Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 ease-in-out"
                  placeholder="Enter organisation name"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 ease-in-out"
                  placeholder="Enter contact email"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 ease-in-out"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 ease-in-out"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Description (full width) */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 ease-in-out"
                placeholder="Brief description about the organisation"
              />
            </div>

            {/* Logo Upload & Preview */}
            <div>
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Organisation Logo
              </label>
              {logoPreview && (
                <div className="mb-3">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-24 h-24 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                  />
                </div>
              )}
              <input
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-700 dark:text-gray-300 
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                           file:text-sm file:font-medium file:bg-gray-200 dark:file:bg-gray-600 
                           file:text-gray-900 dark:file:text-gray-100 
                           hover:file:bg-blue-100 dark:hover:file:bg-blue-900 
                           transition-all duration-200 ease-in-out"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-white font-medium transition-all duration-200 ease-in-out ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {submitting ? "Sending..." : "Send"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrganisationPage;
