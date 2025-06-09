import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { videoAPI } from "../services/api";
import { toast } from "react-toastify";

const CourseVideos = () => {
  const { id } = useParams(); // course ID
  const videosPerPage = 9;

  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!id || videos.length === 0) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: Course not found or no videos available
      </div>
    );
  }

  const totalPages = Math.ceil(videos.length / videosPerPage);
  const idxLast = currentPage * videosPerPage;
  const idxFirst = idxLast - videosPerPage;
  const currentVideos = videos.slice(idxFirst, idxLast);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Course Videos
      </h1>

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
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {video.videoTitle}
              </h2>
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
    </div>
  );
};

export default CourseVideos;