import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CustomCalendar.css"; // ✅ You'll create this file

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transition-colors duration-300">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white mb-2 text-center sm:text-left">
        📅 Calendar
      </h2>
      <div className="overflow-x-auto">
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
