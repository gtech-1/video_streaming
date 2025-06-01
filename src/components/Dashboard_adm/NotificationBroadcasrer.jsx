// NotificationBroadcaster.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const NotificationBroadcaster = () => {
  const [message, setMessage] = useState("");

  const sendNotification = () => {
    if (!message.trim()) return toast.error("Message cannot be empty");
    // Simulate sending
    toast.success("Notification sent to all users!");
    setMessage("");
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        📢 Broadcast Notification
      </h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring dark:bg-slate-700 dark:text-white"
        placeholder="Enter message to broadcast..."
      ></textarea>
      <button
        onClick={sendNotification}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Notification
      </button>
    </div>
  );
};

export default NotificationBroadcaster;
