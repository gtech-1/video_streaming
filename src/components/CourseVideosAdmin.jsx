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
  const [newTitle, setNewTitle] = useState("");
  const [newVideo, setNewVideo] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);

  // Fetch videos when id changes
  useEffect(() => {
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

    if (id) {
      fetchVideos();
    }
  }, [id]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const idxLast = currentPage * videosPerPage;
  const idxFirst = idxLast - videosPerPage;
  const currentVideos = videos.slice(idxFirst, idxLast);

  // Adjust page if deletion changes totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [videos, currentPage, totalPages]);

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

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render error state
  if (!id) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: Course ID missing
      </div>
    );
  }

  // Render main content
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

        {videos.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No videos found. Click "Add Video" to create one.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentVideos.map((video) => (
              <div
                key={video._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                <video
                  className="w-full h-48 object-cover bg-black"
                  src={video.videoUrl}
                  poster={video.thumbnailUrl}
                  controls
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {video.videoTitle}
                  </h2>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => openEditModal(video)}
                      className="p-2 text-blue-600 hover:text-blue-700"
                    >
                      <BiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <BiTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

      {/* Add/Edit Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
              variants={modalVariants}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {editingVideo ? "Edit Video" : "Add New Video"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Video File {!editingVideo && "(required)"}
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Thumbnail Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingVideo ? "Update" : "Add"} Video
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
