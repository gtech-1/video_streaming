import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 text-center sm:text-left">
        📅 Calendar
      </h2>
      <div className="overflow-x-auto">
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full max-w-xs sm:max-w-md"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;


