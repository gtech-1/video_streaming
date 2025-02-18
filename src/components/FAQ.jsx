import React, { useState } from "react";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    { question: "What is the passing percentage?", answer: "The passing percentage is 40% in each subject." },
    { question: "How is attendance calculated?", answer: "Attendance is calculated based on the number of classes attended out of total classes." },
    { question: "Where can I check my grades?", answer: "Grades are available in the Marks section of the dashboard." },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">FAQs</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-2">
          <button
            className="w-full text-left font-semibold bg-gray-200 p-2 rounded-md focus:outline-none"
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            {item.question}
          </button>
          {openFAQ === index && <p className="mt-2 text-gray-600">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
