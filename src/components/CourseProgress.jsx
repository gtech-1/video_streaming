const CourseProgress = () => {
    const courses = [
        { name: "React Basics", progress: 75 },
        { name: "JavaScript Fundamentals", progress: 50 },
        { name: "CSS for Beginners", progress: 90 }
    ];

    return (
        <div>
            {courses.map((course, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <p>{course.name}</p>
                    <div style={{ background: "#ddd", height: "10px", borderRadius: "5px" }}>
                        <div style={{
                            width: `${course.progress}%`,
                            background: "#FF9800",
                            height: "100%",
                            borderRadius: "5px"
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseProgress;
