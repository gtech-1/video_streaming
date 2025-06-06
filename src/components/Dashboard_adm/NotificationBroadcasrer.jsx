// // NotificationBroadcaster.jsx
// import React, { useState } from "react";
// import { toast } from "react-hot-toast";

// const NotificationBroadcaster = () => {
//   const [message, setMessage] = useState("");

//   const sendNotification = () => {
//     if (!message.trim()) return toast.error("Message cannot be empty");
//     // Simulate sending
//     toast.success("Notification sent to all users!");
//     setMessage("");
//   };

//   return (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
//       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//         📢 Broadcast Notification
//       </h2>
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring dark:bg-slate-700 dark:text-white"
//         placeholder="Enter message to broadcast..."
//       ></textarea>
//       <button
//         onClick={sendNotification}
//         className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Send Notification
//       </button>
//     </div>
//   );
// };

// export default NotificationBroadcaster;


import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBullhorn } from "react-icons/fa";

const NotificationBroadcaster = () => {
  const [message, setMessage] = useState("");

  const sendNotification = () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    toast.success("✅ Notification sent to all users!");
    setMessage("");
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <FaBullhorn className="text-blue-600 dark:text-blue-400 text-xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Broadcast Notification
        </h2>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full min-h-[100px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none text-sm dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message here..."
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={sendNotification}
          className="px-5 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationBroadcaster;
