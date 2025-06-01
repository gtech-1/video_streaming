// src/pages/CourseVideosAdmin.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { BiEdit, BiTrash } from "react-icons/bi";
import courseData from "./courseVideosData.json"; // Structure: { [courseId]: [ { id, title, url } ] }

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
  const { id } = useParams(); // course key
  const videosPerPage = 9;

  // Initialize video list from JSON (clone array)
  const initialList = courseData[id] ? [...courseData[id]] : [];
  const [videos, setVideos] = useState(initialList);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  // Form fields
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState(""); // For URL input or blob URL
  const [newFile, setNewFile] = useState(null); // File object if uploaded
  const [insertAfterId, setInsertAfterId] = useState(""); // ID of video after which to insert

  // Pagination calculations
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const idxLast = currentPage * videosPerPage;
  const idxFirst = idxLast - videosPerPage;
  const currentVideos = videos.slice(idxFirst, idxLast);

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
    setNewUrl("");
    setNewFile(null);
    setInsertAfterId(""); // default to top
    setShowModal(true);
  };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setNewTitle(video.title);
    setNewUrl(video.url);
    setNewFile(null);
    setShowModal(true);
  };

  const handleDelete = (videoId) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Create a blob URL for preview/playback
    const blobUrl = URL.createObjectURL(file);
    setNewFile(file);
    setNewUrl(blobUrl);
  };

  const toYouTubeEmbed = (rawUrl) => {
    // Matches "youtube.com/watch?v=VIDEO_ID" or "youtu.be/VIDEO_ID"
    const match = rawUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_\-]+)/
    );
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || (!newUrl.trim() && !newFile)) return;

    if (editingVideo) {
      // Update existing video (retain position)
      setVideos((prev) =>
        prev.map((v) =>
          v.id === editingVideo.id
            ? { ...v, title: newTitle.trim(), url: newUrl.trim() }
            : v
        )
      );
    } else {
      // Add new video at specified position
      const newVideo = {
        id: uuidv4(),
        title: newTitle.trim(),
        url: newUrl.trim(), // blob URL or external URL
      };

      setVideos((prev) => {
        if (!insertAfterId) {
          // Insert at beginning
          return [newVideo, ...prev];
        }
        // Find index of the video after which to insert
        const idx = prev.findIndex((v) => v.id === insertAfterId);
        if (idx === -1) {
          // Fallback: prepend
          return [newVideo, ...prev];
        }
        // Insert after idx
        const updated = [...prev];
        updated.splice(idx + 1, 0, newVideo);
        return updated;
      });
      setCurrentPage(1);
    }

    // Cleanup
    setEditingVideo(null);
    setNewTitle("");
    setNewUrl("");
    setNewFile(null);
    setInsertAfterId("");
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
            {id.toUpperCase()} Videos (Admin)
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
          {currentVideos.map((video) => {
            const embedUrl = toYouTubeEmbed(video.url);
            return (
              <div key={video.id} className="relative group">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  {embedUrl ? (
                    <iframe
                      className="w-full h-48"
                      src={embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="w-full h-48 object-cover bg-black"
                      src={video.url}
                      controls
                    />
                  )}
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {video.title}
                    </h2>
                  </div>
                </div>

                {/* Edit & Delete buttons: always visible on mobile, hover-only on larger screens */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(video)}
                    className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    <BiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    <BiTrash size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* Modal for Add/Edit Video */}
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
              setNewTitle("");
              setNewUrl("");
              setNewFile(null);
              setInsertAfterId("");
            }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
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
                    placeholder="e.g., Introduction to Algorithms"
                  />
                </div>
                <div>
                  <label
                    htmlFor="videoUrl"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Video URL (optional if uploading a file)
                  </label>
                  <input
                    id="videoUrl"
                    type="text"
                    value={newUrl.startsWith("blob:") ? "" : newUrl}
                    onChange={(e) => {
                      setNewFile(null);
                      setNewUrl(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., https://example.com/video.mp4 or YouTube watch link"
                  />
                </div>
                <div>
                  <label
                    htmlFor="videoFile"
                    className="block text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Upload Video File (optional)
                  </label>
                  <input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full text-gray-900 dark:text-gray-100"
                  />
                </div>

                {newUrl && (
                  <div className="mt-2">
                    <span className="block text-gray-700 dark:text-gray-300 mb-1">
                      Preview:
                    </span>
                    <video
                      src={newUrl}
                      controls
                      className="w-full h-40 object-contain border border-gray-300 dark:border-gray-600 rounded"
                    />
                  </div>
                )}

                {/* Insert After selector only when adding new */}
                {!editingVideo && videos.length > 0 && (
                  <div>
                    <label
                      htmlFor="insertAfter"
                      className="block text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Insert After
                    </label>
                    <select
                      id="insertAfter"
                      value={insertAfterId}
                      onChange={(e) => setInsertAfterId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">At Top (First)</option>
                      {videos.map((v) => (
                        <option key={v.id} value={v.id}>
                          After: {v.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingVideo(null);
                      setNewTitle("");
                      setNewUrl("");
                      setNewFile(null);
                      setInsertAfterId("");
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
