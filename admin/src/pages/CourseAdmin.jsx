import React, { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";

const CourseAdmin = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/dbcourses", {
            credentials: "include",
            headers: {
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched courses:", data); // Debug log
                setCourses(data);
                setLoading(false);
            })
            .catch((err) => {
                setCourses([]);
                setLoading(false);
            });
    }, []);

    const handleRename = (code, newName) => {
        const safeCode = code.toLowerCase().trim();
        fetch(`/api/admin/course/${safeCode}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
            body: JSON.stringify({ name: newName }),
            credentials: "include",
        })
            .then((res) => res.json())
            .then((updated) => {
                if (updated && updated.code) {
                    setCourses((courses) =>
                        courses.map((c) =>
                            c.code === updated.code ? { ...c, name: updated.name } : c
                        )
                    );
                }
                // Optionally, fetch the latest courses from backend for full sync
                // fetch("/api/admin/dbcourses", {
                //     credentials: "include",
                //     headers: {
                //         Authorization: "Bearer admin-coursehub-cc23-golang",
                //     },
                // })
                //     .then((res) => res.json())
                //     .then((data) => setCourses(data));
            });
    };

    const handleUpload = (newCourses) => {
        setCourses((courses) => [...courses, ...newCourses]);
    };

    const filtered = Array.isArray(courses)
        ? courses
              .sort((a, b) => {
                  // Put courses with undefined or empty code at the end
                  const isAInvalid = !a.code;
                  const isBInvalid = !b.code;
                  if (isAInvalid === isBInvalid) return 0;
                  return isAInvalid ? 1 : -1;
              })
              .filter(
                  (c) => (c.code && c.code.toLowerCase().includes(search.toLowerCase())) || !c.code
              )
        : [];

    // Only render CourseTable, move all UI into CourseTable for single source of truth
    return <CourseTable courses={filtered} onRename={handleRename} />;
};

export default CourseAdmin;
