import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceBarGraph = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Attendance (%)",
        data: data.values,
        backgroundColor: data.values.map((value) =>
          value < 75 ? "rgba(255, 99, 132, 0.7)" : "rgba(54, 162, 235, 0.7)"
        ),
        borderColor: data.values.map((value) =>
          value < 75 ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#9CA3AF", // Tailwind gray-400
          font: { size: 10 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#9CA3AF",
          beginAtZero: false,
          min: 60,
          max: 85,
          font: { size: 10 },
        },
        grid: { color: "rgba(107, 114, 128, 0.2)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}% Attendance`,
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
        📊 Subject-wise Attendance
      </h2>
      <div className="h-48 sm:h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AttendanceBarGraph;


