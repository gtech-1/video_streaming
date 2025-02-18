import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState(["Hello! How can I help?"]);

  const handleSendMessage = () => {
    setMessages([...messages, "This feature is under development!"]);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded-md">
      <h3 className="font-semibold">💬 Chatbot</h3>
      <div className="h-20 overflow-auto">
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-md mt-2">Ask</button>
    </div>
  );
};

export default Chatbot;
