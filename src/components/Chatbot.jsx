import React, { useState, useEffect, useRef } from "react";
import { BsWechat } from "react-icons/bs";

const Chatbot = () => {
  const [messages, setMessages] = useState(["Hello! How can I help?"]);
  const [isOpen, setIsOpen] = useState(false); 
  const chatWindowRef = useRef(null);

  const handleSendMessage = () => {
    setMessages([...messages, "This feature is under development!"]);
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen); 
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div
        className="fixed bottom-5 right-5 bg-[#111827] text-white p-3 rounded-full cursor-pointer"
        onClick={toggleChatWindow}
      >
        <BsWechat className="text-xl" />
      </div>

      {/* Chatbot Dialog */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-20 right-5 bg-gray-800 text-white p-4 rounded-md w-72 h-96"
        >
          <h3 className="font-semibold">Chatbot</h3>
          <div className="h-64 overflow-auto mb-3">
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Ask
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
