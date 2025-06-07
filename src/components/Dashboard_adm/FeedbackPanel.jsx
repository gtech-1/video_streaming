
import React from "react";
import { FaStar } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    user: "John Smith",
    rating: 5,
    comment: "Great platform! Very intuitive.",
  },
  {
    id: 2,
    user: "Emma Brown",
    rating: 4,
    comment: "Helpful content but could improve UI responsiveness.",
  },
  {
    id: 3,
    user: "Liam Wilson",
    rating: 3,
    comment: "Some courses need updating.",
  },
];

// Calculate average rating
const averageRating =
  feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length;

const FeedbackPanel = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md w-full h-full transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        💬 User Feedback
      </h2>

      {/* Average Rating Summary */}
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold text-yellow-500 mr-2">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${
                i < Math.round(averageRating) ? "opacity-100" : "opacity-30"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
          ({feedbackData.length} reviews)
        </span>
      </div>

      {/* Individual Feedback Cards */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {feedbackData.map(({ id, user, rating, comment }) => (
          <div
            key={id}
            className="bg-gray-50 dark:bg-slate-700 rounded-md p-3 shadow-sm"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-gray-800 dark:text-white">
                {user}
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 text-sm ${
                      i < rating ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPanel;
