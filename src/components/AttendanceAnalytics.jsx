// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const AttendanceAnalytics = () => {
//     const chartRef = useRef(null);
//     const chartInstanceRef = useRef(null);

//     useEffect(() => {
//         if (chartRef.current) {
//             const ctx = chartRef.current.getContext("2d");

//             if (chartInstanceRef.current) {
//                 chartInstanceRef.current.destroy();
//             }

//             chartInstanceRef.current = new Chart(ctx, {
//                 type: "bar",
//                 data: {
//                     labels: ["January", "February", "March"],
//                     datasets: [{
//                         label: "Attendance (%)",
//                         data: [95, 92, 88],
//                         backgroundColor: ["#4CAF50", "#8BC34A", "#CDDC39"],
//                         borderColor: ["#4CAF50", "#8BC34A", "#CDDC39"],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: {
//                         y: { beginAtZero: true, max: 100 }
//                     }
//                 }
//             });
//         }

//         return () => {
//             if (chartInstanceRef.current) {
//                 chartInstanceRef.current.destroy();
//             }
//         };
//     }, []);

//     return <canvas ref={chartRef}></canvas>;
// };

// export default AttendanceAnalytics;
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AttendanceAnalytics = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            // Destroy previous instance to prevent duplicates
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["January", "February", "March"],
                    datasets: [
                        {
                            label: "Attendance (%)",
                            data: [95, 92, 88], // Sample data
                            backgroundColor: ["#FF9800", "#FB8C00", "#F57C00"], // Orange gradient shades
                            borderColor: ["#FF9800", "#FB8C00", "#F57C00"], // Borders match the theme
                            borderWidth: 2,
                            borderRadius: 6, // Rounded bars
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white", // White legend text
                                font: {
                                    size: 14,
                                    weight: "bold",
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                color: "white", // White text on Y-axis
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                color: "#616161", // Dark gray grid lines
                            }
                        },
                        x: {
                            ticks: {
                                color: "white", // White text on X-axis
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                color: "#616161", // Dark gray grid lines
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="attendance-box">
            <h2 className="attendance-title">📊 Attendance Analytics</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default AttendanceAnalytics;
