

import React from "react";

const UpcomingEvents = () => {
  const events = [
    { title: "OS Assignment", date: "Feb 20", priority: "High" },
    { title: "AIML Project", date: "Feb 25", priority: "Medium" },
    { title: "DSA Evaluation", date: "Mar 5", priority: "Low" },
  ];

  
  const sortedEvents = events.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Indigo animated border */}
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
      <h2 className="text-xl font-bold mb-4">⏳ Upcoming Events</h2>
      <ul>
        {sortedEvents.map((event, index) => (
          <li key={index} className="border-b p-3 flex justify-between">
            <span className="font-medium">{event.title} - {event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;

