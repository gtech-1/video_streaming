
import React from "react";
import { FaCalendarDay, FaClock } from "react-icons/fa";

const timetable = [
  { day: "Monday", events: ["9 AM - Math", "11 AM - Physics", "2 PM - CS"] },
  // { day: "Tuesday", events: ["10 AM - Chemistry", "1 PM - English"] },
  { day: "Wednesday", events: ["9 AM - Math", "11 AM - Lab"] },
  // { day: "Thursday", events: ["10 AM - Physics", "2 PM - Sports"] },
  { day: "Friday", events: ["9 AM - CS", "12 PM - Workshop"] },
];

const TimetableComponent = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md w-full transition-colors duration-300">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
        📅 Weekly Timetable
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {timetable.map((day, idx) => (
          <div
            key={idx}
            className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md"
          >
            <div className="flex items-center text-sm font-medium text-gray-800 dark:text-white mb-1">
              <FaCalendarDay className="mr-2 text-indigo-500 text-xs" />
              {day.day}
            </div>
            <ul className="pl-4 text-xs text-gray-700 dark:text-gray-300 space-y-0.5">
              {day.events.map((event, i) => (
                <li key={i} className="flex items-center">
                  <FaClock className="text-indigo-400 mr-2 text-[10px]" />
                  {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableComponent;
