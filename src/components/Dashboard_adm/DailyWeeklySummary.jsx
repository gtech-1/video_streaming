
// DailyWeeklySummary.jsx
import React from "react";

const DailyWeeklySummary = () => {
  const summary = [
    { label: "Logins Today", value: 83 },
    { label: "Submissions This Week", value: 412 },
    { label: "New Registrations", value: 19 },
    { label: "Feedback Received", value: 7 },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🗓️ Daily / Weekly Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {summary.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-blue-50 dark:bg-slate-700 rounded-lg flex justify-between items-center shadow"
          >
            <p className="text-sm text-gray-700 dark:text-gray-200">{item.label}</p>
            <p className="text-lg font-bold text-blue-800 dark:text-blue-300">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeeklySummary;
