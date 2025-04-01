import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CreditsDoughnutChart = ({ earnedCredits = 130, totalCredits = 180, size = 200 }) => {
  const remainingCredits = totalCredits - earnedCredits;

  const data = {
    labels: ["Earned Credits", "Remaining Credits"],
    datasets: [
      {
        data: [earnedCredits, remainingCredits],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        hoverBackgroundColor: ["#45A049", "#BDBDBD"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} credits`,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-full transition-colors duration-300">
      <h2 className="text-gray-700 dark:text-white text-xl font-semibold text-center mb-4">
        Credits Earned
      </h2>
      <div
        className="relative flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Doughnut data={data} options={options} />
        <div className="absolute flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white">
          {earnedCredits} / {totalCredits}
        </div>
      </div>
    </div>
  );
};

export default CreditsDoughnutChart;
