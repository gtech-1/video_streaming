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

const CgpaLineGraph = () => {
  // Semesters & CGPA data
  const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
  const cgpaData = [9.0, 7.8, 8.3, 9.0, 8.1, 8.5]; // Sample CGPA Data

  const data = {
    labels: semesters,
    datasets: [
      {
        label: "CGPA",
        data: cgpaData,
        borderColor: "#4F46E5", // Indigo Blue Line
        backgroundColor: "rgba(79, 70, 229, 0.2)", // Light Blue Fill
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        tension: 0.4, // Smooth Curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#374151", font: { size: 10 } }, // Smaller font for mobile
        grid: { display: false },
      },
      y: {
        ticks: { color: "#374151", beginAtZero: false, min: 5, max: 10, font: { size: 10 } }, // Smaller font for mobile
        grid: { color: "rgba(209, 213, 219, 0.5)" },
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `CGPA: ${tooltipItem.raw}`,
        },
      },
    },
    animation: {
      duration: 1000, // 1 second animation
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
      <h2 className="text-gray-700 text-base sm:text-lg font-semibold mb-4">
        📈 CGPA Over Semesters
      </h2>
      <div className="h-48 sm:h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CgpaLineGraph;

