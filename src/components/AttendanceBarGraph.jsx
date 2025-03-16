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

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceBarGraph = () => {
  // Subject-wise attendance percentages
  const subjects = ["Math", "Physics", "Chemistry", "CS", "English"];
  const attendanceData = [78, 85, 72, 80, 65]; // Attendance percentages

  const data = {
    labels: subjects,
    datasets: [
      {
        label: "Attendance (%)",
        data: attendanceData,
        backgroundColor: attendanceData.map((value) =>
          value < 75 ? "rgba(255, 99, 132, 0.7)" : "rgba(54, 162, 235, 0.7)"
        ), // Red if <75%, Blue otherwise
        borderColor: attendanceData.map((value) =>
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
        ticks: { color: "#374151", font: { size: 10 } }, // Smaller font for mobile
        grid: { display: false },
      },
      y: {
        ticks: { color: "#374151", beginAtZero: false, min: 60, max: 85, font: { size: 10 } }, // Smaller font for mobile
        grid: { color: "rgba(209, 213, 219, 0.5)" },
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
      duration: 1000, // 1-second animation for bars
    },
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
      <h2 className="text-gray-700 text-base sm:text-lg font-semibold mb-4">
        📊 Subject-wise Attendance
      </h2>
      <div className="h-48 sm:h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceBarGraph;

