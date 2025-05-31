import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Direct import of your JSON file
import courseData from "./courseVideosData.json";

const CourseVideos = () => {
  const { id } = useParams();        // course key (e.g. "python", "java", etc.)
  const videosPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);

  // Get the array for this course ID
  const filteredVideos = courseData[id] || [];

  if (!id || filteredVideos.length === 0) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: Course not found
      </div>
    );
  }

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const idxLast = currentPage * videosPerPage;
  const idxFirst = idxLast - videosPerPage;
  const currentVideos = filteredVideos.slice(idxFirst, idxLast);

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
        {id.toUpperCase()} Course Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            <iframe
              className="w-full h-48"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {video.title}
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
    </div>
  );
};

export default CourseVideos;