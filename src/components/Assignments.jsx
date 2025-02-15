// const Assignments = () => {
//     const assignments = [
//         { title: "React Project", dueDate: "Feb 20, 2025" },
//         { title: "CSS Styling Task", dueDate: "Feb 25, 2025" },
//         { title: "JavaScript Quiz", dueDate: "Feb 28, 2025" }
//     ];

//     return (
//         <div>
//             <ul>
//                 {assignments.map((assign, index) => (
//                     <li key={index}>
//                         <strong>{assign.title}</strong> - Due: {assign.dueDate}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Assignments;

// const Assignments = () => {
//     const assignments = [
//         { title: "React Project", dueDate: "Feb 20, 2025" },
//         { title: "CSS Styling Task", dueDate: "Feb 25, 2025" },
//         { title: "JavaScript Quiz", dueDate: "Feb 28, 2025" }
//     ];

//     return (
//         <div style={styles.container}>
//             {/* <h2 style={styles.heading}>📌 Upcoming Assignments</h2> */}
//             <ul style={styles.list}>
//                 {assignments.map((assign, index) => (
//                     <li key={index} style={styles.listItem}>
//                         <strong style={styles.title}>{assign.title}</strong>
//                         <span style={styles.dueDate}> - Due: {assign.dueDate}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         backgroundColor: "#f8f9fa",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         maxWidth: "400px",
//         margin: "auto",
//         fontFamily: "Arial, sans-serif",
//     },
//     heading: {
//         textAlign: "center",
//         color: "#333",
//         fontSize: "20px",
//         marginBottom: "15px",
//     },
//     list: {
//         listStyleType: "none",
//         padding: "0",
//     },
//     listItem: {
//         backgroundColor: "#ffffff",
//         margin: "10px 0",
//         padding: "12px",
//         borderRadius: "8px",
//         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     title: {
//         fontSize: "16px",
//         color: "#007bff",
//     },
//     dueDate: {
//         fontSize: "14px",
//         color: "#6c757d",
//     },
// };

// export default Assignments;

import { FaRegCalendarAlt } from "react-icons/fa"; // Importing Calendar Icon

const Assignments = () => {
    const assignments = [
        { title: "React Project", dueDate: "Feb 20, 2025" },
        { title: "CSS Styling Task", dueDate: "Feb 25, 2025" },
        { title: "JavaScript Quiz", dueDate: "Feb 28, 2025" }
    ];

    return (
        <div style={styles.container}>
            {/* <h2 style={styles.heading}>📌 Upcoming Assignments</h2> */}
            <ul style={styles.list}>
                {assignments.map((assign, index) => (
                    <li key={index} style={styles.listItem}>
                        <span style={styles.title}>{assign.title}</span>
                        <span style={styles.calendar}>
                            <FaRegCalendarAlt style={styles.icon} /> {assign.dueDate}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "#424242", // Dark gray background
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        maxWidth: "420px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "center",
        color: "#FF9800", // Orange Theme
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "15px",
    },
    list: {
        listStyleType: "none",
        padding: "0",
    },
    listItem: {
        backgroundColor: "#ffffff",
        margin: "12px 0",
        padding: "14px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.2s",
    },
    listItemHover: {
        transform: "scale(1.02)", // Slight hover effect
    },
    title: {
        fontSize: "16px",
        color: "#424242",
        fontWeight: "bold",
    },
    calendar: {
        display: "flex",
        alignItems: "center",
        color: "#FF9800",
        fontSize: "14px",
    },
    icon: {
        marginRight: "6px",
        fontSize: "16px",
    },
};

export default Assignments;





