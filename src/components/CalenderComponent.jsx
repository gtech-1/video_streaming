// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "../styles/CustomCalendar.css"; // ✅ You'll create this file

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transition-colors duration-300">
//       <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white mb-2 text-center sm:text-left">
//         📅 Calendar
//       </h2>
//       <div className="overflow-x-auto">
//         <Calendar
//           onChange={setDate}
//           value={date}
//           className="custom-calendar"
//         />
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;



import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CustomCalendar.css"; // Custom styling
import { createPortal } from "react-dom";

const sampleEvents = {
  "2025-06-01": ["Team Meeting at 10 AM", "Course Launch"],
  "2025-06-02": ["Deadline: React Project"],
  "2025-06-05": ["Webinar on AI Trends"],
};

const formatDateKey = (date) => date.toISOString().split("T")[0];

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState(null);

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    const key = formatDateKey(clickedDate);
    if (sampleEvents[key]) {
      setSelectedDateEvents({
        date: clickedDate,
        events: sampleEvents[key],
      });
    } else {
      setSelectedDateEvents({
        date: clickedDate,
        events: ["No events scheduled."],
      });
    }
  };

  const closeModal = () => setSelectedDateEvents(null);

  return (
    <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transition-colors duration-300">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white mb-2 text-center sm:text-left">
        📅 Calendar
      </h2>
      <div className="overflow-x-auto">
        <Calendar
          onChange={handleDateClick}
          value={date}
          className="custom-calendar"
        />
      </div>

      {selectedDateEvents &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Events on {selectedDateEvents.date.toDateString()}
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                {selectedDateEvents.events.map((event, index) => (
                  <li key={index}>• {event}</li>
                ))}
              </ul>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CalendarComponent;