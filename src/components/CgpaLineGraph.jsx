import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const CgpaLineGraph = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "CGPA",
        data: data.values,
        borderColor: "#4F46E5", // Indigo
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#9CA3AF", // Tailwind's text-gray-400
          font: { size: 10 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#9CA3AF",
          beginAtZero: false,
          min: 5,
          max: 10,
          font: { size: 10 },
        },
        grid: { color: "rgba(107, 114, 128, 0.2)" }, // Tailwind gray-500
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `CGPA: ${tooltipItem.raw}`,
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transition-colors duration-300">
      <h2 className="text-gray-700 dark:text-white text-base sm:text-lg font-semibold mb-4">
        📈 CGPA Over Semesters
      </h2>
      <div className="h-48 sm:h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CgpaLineGraph;


