// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const subscriptionData = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//   ],
//   datasets: [
//     {
//       label: "Active Subscriptions",
//       data: [120, 135, 150, 170, 180, 200, 210],
//       backgroundColor: "#4F46E5",
//       borderRadius: 5,
//     },
//     {
//       label: "New Subscriptions",
//       data: [30, 45, 40, 60, 55, 65, 70],
//       backgroundColor: "#6366F1",
//       borderRadius: 5,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//       labels: { color: "#9CA3AF" },
//     },
//     tooltip: {
//       enabled: true,
//     },
//   },
//   scales: {
//     x: {
//       ticks: { color: "#9CA3AF" },
//       grid: { display: false },
//     },
//     y: {
//       ticks: { color: "#9CA3AF" },
//       grid: { color: "rgba(156, 163, 175, 0.2)" },
//       beginAtZero: true,
//     },
//   },
// };

// const SubscriptionOverview = () => {
//   return (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-4xl transition-colors duration-300">
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//         💳 Subscription Overview
//       </h2>
//       <Bar data={subscriptionData} options={options} height={250} />
//       <div className="mt-4 flex justify-between text-gray-700 dark:text-gray-300 text-sm">
//         <div>
//           <span className="font-semibold">Total Active:</span> 210
//         </div>
//         <div>
//           <span className="font-semibold">New This Month:</span> 70
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionOverview;


import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const subscriptionData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Active",
      data: [120, 135, 150, 170, 180, 200, 210],
      backgroundColor: "#4F46E5",
      borderRadius: 4,
      barThickness: 14,
    },
    {
      label: "New",
      data: [30, 45, 40, 60, 55, 65, 70],
      backgroundColor: "#6366F1",
      borderRadius: 4,
      barThickness: 14,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: "#9CA3AF", boxWidth: 12, padding: 15 },
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      ticks: { color: "#9CA3AF", font: { size: 12 } },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#9CA3AF", font: { size: 12 } },
      grid: { color: "rgba(156, 163, 175, 0.15)" },
    },
  },
};

const SubscriptionOverview = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md w-full h-full transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        💳 Subscription Overview
      </h2>
      <div className="h-60">
        <Bar data={subscriptionData} options={options} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-semibold">Total Active:</span> 210
        </div>
        <div>
          <span className="font-semibold">New This Month:</span> 70
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
