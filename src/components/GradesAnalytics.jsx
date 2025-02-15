// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import "../styles/Dashboard.css"; // Import global styles

// const GradesAnalytics = () => {
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
//                     labels: ["ISA 1", "ISA 2", "Final Exam"],
//                     datasets: [{
//                         label: "Grades (%)",
//                         data: [78, 85, 90], // Sample data
//                         backgroundColor: "#FF9800", // Orange background
//                         borderColor: "#E65100", // Darker orange for border
//                         borderWidth: 2
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: "white", // White text in legend
//                                 font: {
//                                     size: 14
//                                 }
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             max: 100,
//                             ticks: {
//                                 color: "white", // White text on Y-axis
//                                 font: {
//                                     size: 12
//                                 }
//                             }
//                         },
//                         x: {
//                             ticks: {
//                                 color: "white", // White text on X-axis
//                                 font: {
//                                     size: 12
//                                 }
//                             }
//                         }
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

//     return (
//         <div className="grades-box">
//             <h2 className="grades-title">📊 Grades Analytics</h2>
//             <canvas ref={chartRef}></canvas>
//         </div>
//     );
// };

// export default GradesAnalytics;
// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import "../styles/Dashboard.css"; // Import global styles

// const GradesAnalytics = () => {
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
//                     labels: ["ISA 1", "ISA 2", "Final Exam"],
//                     datasets: [{
//                         label: "Marks (%)",
//                         data: [78, 85, 90], // Sample data
//                         backgroundColor: "#E53935", // Red bars
//                         borderColor: "#B71C1C", // Darker red for contrast
//                         borderWidth: 2
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 color: "white", // White text for legend
//                                 font: {
//                                     size: 14
//                                 }
//                             }
//                         }
//                     },
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             max: 100,
//                             ticks: {
//                                 color: "white", // White text on Y-axis
//                                 font: {
//                                     size: 12
//                                 }
//                             }
//                         },
//                         x: {
//                             ticks: {
//                                 color: "white", // White text on X-axis
//                                 font: {
//                                     size: 12
//                                 }
//                             }
//                         }
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

//     return (
//         <div className="grades-box">
//             <h2 className="grades-title">📊 Grades Analytics</h2>
//             <canvas ref={chartRef}></canvas>
//         </div>
//     );
// };

// export default GradesAnalytics;
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles/Dashboard.css"; // Import global styles

const GradesAnalytics = () => {
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
                    labels: ["ISA 1", "ISA 2", "Final Exam"],
                    datasets: [
                        {
                            label: "Marks (%)",
                            data: [78, 85, 90], // Sample data
                            backgroundColor: "#FF9800", // Orange bars
                            borderColor: "#F57C00", // Darker orange for contrast
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
        <div className="grades-box">
            <h2 className="grades-title">📊 Grades Analytics</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default GradesAnalytics;


