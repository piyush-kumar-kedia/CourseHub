import { API_BASE_URL } from "./server.js";

// Fetch all courses
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}api/admin/dbcourses`, {
            credentials: "include",
            headers: {
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

// Update course name
export const updateCourseName = async (code, newName) => {
    try {
        const safeCode = code.toLowerCase().trim();
        const response = await fetch(`${API_BASE_URL}api/admin/course/${safeCode}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
            body: JSON.stringify({ name: newName }),
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating course name:", error);
        throw error;
    }
};
