// src/pages/CourseVideosAdmin.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiEdit, BiTrash } from "react-icons/bi";
import { videoAPI } from "../services/api";
import { toast } from "react-toastify";

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-30%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { y: "-30%", opacity: 0, transition: { duration: 0.2 } },
};

const CourseVideosAdmin = () => {
  const { id } = useParams(); // course ID
  const videosPerPage = 9;

  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [newTitle, setNewTitle] = useState("");
  const [newVideo, setNewVideo] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);

  // Pagination calculations
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const idxLast = currentPage * videosPerPage;
  const idxFirst = idxLast - videosPerPage;
  const currentVideos = videos.slice(idxFirst, idxLast);

  useEffect(() => {
    fetchVideos();
  }, [id]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videoAPI.getVideos(id);
      setVideos(response.data);
    } catch (error) {
      toast.error("Failed to fetch videos");
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Adjust page if deletion changes totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [videos, currentPage, totalPages]);

  if (!id) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: Course ID missing
      </div>
    );
  }

  const openAddModal = () => {
    setEditingVideo(null);
    setNewTitle("");
    setNewVideo(null);
    setNewThumbnail(null);
    setShowModal(true);
  };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setNewTitle(video.videoTitle);
    setNewVideo(null);
    setNewThumbnail(null);
    setShowModal(true);
  };

  const handleDelete = async (videoId) => {
    try {
      await videoAPI.deleteVideo(videoId);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
      toast.success("Video deleted successfully");
    } catch (error) {
      toast.error("Failed to delete video");
      console.error("Error deleting video:", error);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewVideo(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || (!newVideo && !editingVideo)) return;

    try {
      const formData = new FormData();
      formData.append("videoTitle", newTitle.trim());
      if (newVideo) {
        formData.append("video", newVideo);
      }
      if (newThumbnail) {
        formData.append("thumbnail", newThumbnail);
      }

      if (editingVideo) {
        const response = await videoAPI.updateVideo(editingVideo._id, formData);
        setVideos((prev) =>
          prev.map((v) => (v._id === editingVideo._id ? response.data : v))
        );
        toast.success("Video updated successfully");
      } else {
        const response = await videoAPI.createVideo(id, formData);
        setVideos((prev) => [response.data, ...prev]);
        toast.success("Video created successfully");
      }

      setEditingVideo(null);
      setNewTitle("");
      setNewVideo(null);
      setNewThumbnail(null);
      setShowModal(false);
    } catch (error) {
      toast.error(editingVideo ? "Failed to update video" : "Failed to create video");
      console.error("Error saving video:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Videos (Admin)
          </h1>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            + Add Video
          </button>
        </div>

        {videos.length === 0 && (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No videos found. Click "Add Video" to create one.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentVideos.map((video) => (
            <div key={video._id} className="relative group">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <video
                  className="w-full h-48 object-cover bg-black"
                  src={video.videoUrl}
                  poster={video.thumbnailUrl}
                  controls
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {video.videoTitle}
                  </h2>
                </div>
              </div>

              {/* Edit & Delete buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(video)}
                  className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <BiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <BiTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* Modal for Adding/Editing Video */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={() => {
              setShowModal(false);
              setEditingVideo(null);
            }}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {editingVideo ? "Edit Video" : "Add New Video"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="videoTitle"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Video Title
                  </label>
                  <input
                    id="videoTitle"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="videoFile"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {editingVideo ? "Change Video" : "Upload Video"}
                  </label>
                  <input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="thumbnailFile"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {editingVideo ? "Change Thumbnail" : "Upload Thumbnail"}
                  </label>
                  <input
                    id="thumbnailFile"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full text-gray-900 dark:text-gray-100"
                  />
                </div>

                {editingVideo && !newThumbnail && (
                  <div className="mt-2">
                    <span className="block text-gray-700 dark:text-gray-300 mb-1">
                      Current Thumbnail:
                    </span>
                    <img
                      src={editingVideo.thumbnailUrl}
                      alt="Current Thumbnail"
                      className="w-full h-40 object-contain border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                )}

                {newThumbnail && (
                  <div className="mt-2">
                    <span className="block text-gray-700 dark:text-gray-300 mb-1">
                      Thumbnail Preview:
                    </span>
                    <img
                      src={URL.createObjectURL(newThumbnail)}
                      alt="Thumbnail Preview"
                      className="w-full h-40 object-contain border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingVideo(null);
                      setNewTitle("");
                      setNewVideo(null);
                      setNewThumbnail(null);
                    }}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {editingVideo ? "Save Changes" : "Add Video"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseVideosAdmin;
