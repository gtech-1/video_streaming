
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const StatisticsChart = () => {
  const chartRef = useRef(null);

  // Create gradient effect for the line chart
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.6)"); // Light blue at top
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fade to transparent

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Hours Spent",
        data: [2, 4, 9, 3, 5, 2, 4], // Example Data
        fill: true,
        borderColor: "#3B82F6", // Bright Blue Line
        backgroundColor: "rgba(59, 130, 246, 0.3)", // Will be replaced by gradient
        tension: 0.4, // Smooth curve effect
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointRadius: 4, // Slightly smaller points on mobile
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#374151", font: { size: 10 } }, // Smaller font for mobile
        grid: { color: "rgba(209, 213, 219, 0.5)" }, // Light gray grid lines
      },
      y: {
        ticks: { color: "#374151", stepSize: 2, font: { size: 10 } }, // Smaller font for mobile
        grid: { color: "rgba(209, 213, 219, 0.5)" }, // Light gray grid lines
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
      <h2 className="text-gray-800 text-base sm:text-lg font-semibold">Statistics</h2>
      <p className="text-gray-600 text-xs sm:text-sm">Hours Spent Last Week</p>
      <div className="h-40 sm:h-48">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default StatisticsChart;
