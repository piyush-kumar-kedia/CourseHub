import React, { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";

const CourseAdmin = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("/api/admin/dbcourses", {
            credentials: "include",
            headers: {
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch(() => {
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
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredCourses = courses.filter((course) =>
        course.code?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses by code"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                />
            </div>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <CourseTable
                    courses={filteredCourses}
                    onRename={handleRename}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default CourseAdmin;
