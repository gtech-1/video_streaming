import React, { useState } from "react";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    { question: "What is the passing percentage?", answer: "The passing percentage is 40% in each subject." },
    { question: "How is attendance calculated?", answer: "Attendance is calculated based on the number of classes attended out of total classes." },
    { question: "Where can I check my grades?", answer: "Grades are available in the Marks section of the dashboard." },
  ];

  return (
    // <div className="bg-white p-4 rounded-lg shadow">
    <div className="relative p-6 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Indigo animated border */}
      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl animate-pulse"></div>
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





// import React, { useState } from "react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"; 

// const FAQ = () => {
//   const [openFAQ, setOpenFAQ] = useState(null);

//   const faqData = [
//     { 
//       question: "📊 What is the passing percentage?", 
//       answer: "The passing percentage is 40% in each subject." 
//     },
//     { 
//       question: "📌 How is attendance calculated?", 
//       answer: "Attendance is calculated based on the number of classes attended out of total classes." 
//     },
//     { 
//       question: "🎓 Where can I check my grades?", 
//       answer: "Grades are available in the Marks section of the dashboard." 
//     },
//   ];

//   return (
//     <div className="relative p-6 bg-white shadow-lg rounded-xl overflow-hidden border-2 border-transparent animate-borderGlow">
//       {/* Indigo Animated Border */}
//       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-transparent to-indigo-500 rounded-xl border-2 border-indigo-500 opacity-75 animate-pulse"></div>

//       {/* Title */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">❓ FAQs</h2>

//       {/* FAQ List */}
//       <div className="space-y-3">
//         {faqData.map((item, index) => (
//           <div key={index} className="border-2 border-indigo-400 rounded-lg p-3 shadow-md bg-indigo-50 
//           hover:bg-indigo-100 hover:shadow-lg transition-all cursor-pointer">
            
//             {/* Question */}
//             <button
//               className="w-full flex justify-between items-center text-left font-semibold focus:outline-none"
//               onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
//             >
//               <span className="text-gray-800">{item.question}</span>
//               {openFAQ === index ? (
//                 <ChevronUpIcon className="w-5 h-5 text-indigo-600" />
//               ) : (
//                 <ChevronDownIcon className="w-5 h-5 text-indigo-600" />
//               )}
//             </button>

//             {/* Answer */}
//             {openFAQ === index && (
//               <p className="mt-2 text-gray-700 bg-white p-2 rounded-md shadow-md">
//                 {item.answer}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQ;
