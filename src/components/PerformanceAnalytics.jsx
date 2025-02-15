// // // import { useEffect, useRef } from "react";
// // // import Chart from "chart.js/auto";

// // // const PerformanceAnalytics = () => {
// // //     const chartRef = useRef(null);
// // //     const chartInstanceRef = useRef(null); // Store chart instance

// // //     useEffect(() => {
// // //         if (chartRef.current) {
// // //             const ctx = chartRef.current.getContext("2d");

// // //             // Destroy the existing chart instance if it exists
// // //             if (chartInstanceRef.current) {
// // //                 chartInstanceRef.current.destroy();
// // //             }

// // //             // Create a new chart instance
// // //             chartInstanceRef.current = new Chart(ctx, {
// // //                 type: "bar",
// // //                 data: {
// // //                     labels: ["React", "CSS", "JavaScript"],
// // //                     datasets: [{
// // //                         label: "Grades (%)",
// // //                         data: [85, 90, 75],
// // //                         backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
// // //                     }]
// // //                 }
// // //             });
// // //         }

// // //         // Cleanup function to destroy chart when component unmounts
// // //         return () => {
// // //             if (chartInstanceRef.current) {
// // //                 chartInstanceRef.current.destroy();
// // //             }
// // //         };
// // //     }, []);

// // //     return (
// // //         <div>
// // //             <canvas ref={chartRef}></canvas>
// // //         </div>
// // //     );
// // // };

// // // export default PerformanceAnalytics;

// // import { useEffect, useRef } from "react";
// // import Chart from "chart.js/auto";

// // const PerformanceAnalytics = () => {
// //     const chartRef = useRef(null);
// //     const chartInstanceRef = useRef(null);

// //     useEffect(() => {
// //         if (chartRef.current) {
// //             const ctx = chartRef.current.getContext("2d");

// //             if (chartInstanceRef.current) {
// //                 chartInstanceRef.current.destroy();
// //             }

// //             // ISA 1, ISA 2 Marks & Attendance %
// //             chartInstanceRef.current = new Chart(ctx, {
// //                 type: "bar",
// //                 data: {
// //                     labels: ["ISA 1", "ISA 2", "Attendance %"],
// //                     datasets: [{
// //                         label: "Student Performance",
// //                         data: [78, 85, 92], // Sample Marks & Attendance
// //                         backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"]
// //                     }]
// //                 },
// //                 options: {
// //                     responsive: true,
// //                     scales: {
// //                         y: {
// //                             beginAtZero: true,
// //                             max: 100
// //                         }
// //                     }
// //                 }
// //             });
// //         }

// //         return () => {
// //             if (chartInstanceRef.current) {
// //                 chartInstanceRef.current.destroy();
// //             }
// //         };
// //     }, []);

// //     return (
// //         <div>
// //             <canvas ref={chartRef}></canvas>
// //         </div>
// //     );
// // };

// // export default PerformanceAnalytics;
// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const PerformanceAnalytics = () => {
//     const chartRef = useRef(null);
//     const chartInstanceRef = useRef(null);

//     useEffect(() => {
//         if (chartRef.current) {
//             const ctx = chartRef.current.getContext("2d");

//             if (chartInstanceRef.current) {
//                 chartInstanceRef.current.destroy();
//             }

//             // ISA 1, ISA 2 Marks & Attendance %
//             chartInstanceRef.current = new Chart(ctx, {
//                 type: "bar",
//                 data: {
//                     labels: ["ISA 1", "ISA 2", "Attendance %"],
//                     datasets: [{
//                         label: "Performance Metrics",
//                         data: [78, 85, 92], // Sample Marks & Attendance
//                         backgroundColor: ["#FFC107", "#03A9F4", "#4CAF50"]
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             max: 100
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
//         <div>
//             <canvas ref={chartRef}></canvas>
//         </div>
//     );
// };

// export default PerformanceAnalytics;

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PerformanceAnalytics = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // ISA 1, ISA 2 Marks & Attendance %
            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["ISA 1", "ISA 2", "Attendance %"],
                    datasets: [{
                        label: "Performance Metrics",
                        data: [78, 85, 92], // Sample Marks & Attendance
                        backgroundColor: [
                            "rgba(255, 193, 7, 0.8)",  // ISA 1 - Yellow
                            "rgba(3, 169, 244, 0.8)", // ISA 2 - Blue
                            "rgba(76, 175, 80, 0.8)"  // Attendance - Green
                        ],
                        borderColor: [
                            "rgba(255, 193, 7, 1)",  
                            "rgba(3, 169, 244, 1)",  
                            "rgba(76, 175, 80, 1)"
                        ],
                        borderWidth: 2,
                        hoverBackgroundColor: [
                            "rgba(255, 193, 7, 1)",
                            "rgba(3, 169, 244, 1)",
                            "rgba(76, 175, 80, 1)"
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white",
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                color: "white",
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            ticks: {
                                color: "white",
                                font: {
                                    size: 12
                                }
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
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PerformanceAnalytics;
