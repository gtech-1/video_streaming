// // const RecentCourses = () => {
// //     const recentCourses = [
// //         { title: "React Basics", url: "#" },
// //         { title: "CSS Animations", url: "#" },
// //         { title: "JavaScript ES6", url: "#" }
// //     ];

// //     return (
// //         <div>
// //             <ul>
// //                 {recentCourses.map((course, index) => (
// //                     <li key={index}><a href={course.url}>{course.title}</a></li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default RecentCourses;
const RecentCourses = () => {
    const recentCourses = [
        { title: "React Basics", url: "https://react.dev/learn" },
        { title: "CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/animation" },
        { title: "JavaScript ES6", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" }
    ];

    return (
        <div>
            <ul style={styles.list}>
                {recentCourses.map((course, index) => (
                    <li key={index} style={styles.listItem}>
                        <a href={course.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            {course.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        marginBottom: "10px",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontWeight: "bold",
        padding: "5px 10px",
        backgroundColor: "#FF9800", // Dark blue color for links
        borderRadius: "5px",
        display: "inline-block",
    }
};

export default RecentCourses;
// const RecentCourses = () => {
//     const recentCourses = [
//         { title: "React Basics", url: "https://react.dev/learn" },
//         { title: "CSS Animations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/animation" },
//         { title: "JavaScript ES6", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" }
//     ];

//     return (
//         <div>
//             <ul className="list">
//                 {recentCourses.map((course, index) => (
//                     <li key={index} className="list-item">
//                         <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link">
//                             {course.title}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default RecentCourses;
