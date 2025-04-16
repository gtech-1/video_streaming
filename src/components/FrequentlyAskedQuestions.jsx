import React, { useState } from "react";

const FrequentlyAskedQuestions = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "Go to account settings, click on 'Change Password', and follow the instructions.",
    },
    {
      question: "Where can I access course materials?",
      answer: "All materials are available under the 'My Courses' section.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out via email at support@university.com or through live chat.",
    },
    {
      question: "Are certificates provided?",
      answer: "Yes, after successfully completing a course, a certificate is issued.",
    },
  ];

  return (
    <div className="relative p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg transition-all">
            <button
              className="w-full text-left flex justify-between items-center font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            >
              {item.question}
              <span className="text-lg">{openFAQ === index ? "▲" : "▼"}</span>
            </button>
            {openFAQ === index && (
              <p className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-b-lg transition-all">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
