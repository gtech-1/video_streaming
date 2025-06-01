// TimetableComponent.jsx
import React from "react";

const timetable = [
  { day: "Monday", events: ["9 AM - Math", "11 AM - Physics", "2 PM - CS"] },
  { day: "Tuesday", events: ["10 AM - Chemistry", "1 PM - English"] },
  { day: "Wednesday", events: ["9 AM - Math", "11 AM - Lab"] },
  { day: "Thursday", events: ["10 AM - Physics", "2 PM - Sports"] },
  { day: "Friday", events: ["9 AM - CS", "12 PM - Workshop"] },
];

const TimetableComponent = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        📅 Weekly Timetable
      </h2>
      <div className="space-y-4">
        {timetable.map((day, idx) => (
          <div key={idx} className="border-b pb-2 dark:border-slate-600">
            <p className="font-bold text-gray-800 dark:text-white">{day.day}</p>
            <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
              {day.events.map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableComponent;
