import React, { useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const StatisticsChart = () => {
  const chartRef = useRef(null);
  const darkMode = useSelector((state) => state.theme.darkMode); // Detect dark mode

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Hours Spent",
        data: [2, 4, 9, 3, 5, 2, 4],
        fill: true,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.3)", // default; will override below
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#D1D5DB" : "#6B7280", // light gray in dark, gray-500 in light
          font: { size: 10 },
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(107,114,128,0.2)",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#D1D5DB" : "#6B7280",
          font: { size: 10 },
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(107,114,128,0.2)",
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.canvas) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);

      if (darkMode) {
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
        gradient.addColorStop(1, "rgba(30, 41, 59, 0.0)"); // darker stop
      } else {
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.6)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      chartInstance.data.datasets[0].backgroundColor = gradient;
      chartInstance.update();
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transition-colors duration-300">
      <h2 className="text-gray-800 dark:text-white text-base sm:text-lg font-semibold">
        Statistics
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
        Hours Spent Last Week
      </p>
      <div className="h-40 sm:h-48">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default StatisticsChart;
