// FeedbackPanel.jsx
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
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-3xl transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">💬 User Feedback</h2>

      <div className="flex items-center mb-6">
        <span className="text-lg font-bold text-yellow-500 mr-2">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${i < Math.round(averageRating) ? "opacity-100" : "opacity-40"}`}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
          ({feedbackData.length} reviews)
        </span>
      </div>

      <div className="space-y-4 max-h-72 overflow-y-auto">
        {feedbackData.map(({ id, user, rating, comment }) => (
          <div key={id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800 dark:text-white">{user}</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${i < rating ? "opacity-100" : "opacity-40"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPanel;
