import React, { useState } from "react";
import styles from "./CourseTable.module.scss";

const CARD_COLORS = [
    "#fef9c3", // light yellow
    "#dbeafe", // light blue
    "#fce7f3", // light pink
    "#dcfce7", // light green
    "#f3e8ff", // light purple
    "#fee2e2", // light red
    "#e0e7ff", // light indigo
    "#f1f5f9", // light slate
];

const CourseTable = ({ courses, onRename, onUpload }) => {
    const [editCode, setEditCode] = useState(null);
    const [newName, setNewName] = useState("");
    const [search, setSearch] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInput = React.useRef();

    // Handle CSV file selection
    const handleFile = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file || null);
    };

    // Handle CSV upload
    const handleUpload = async (e) => {
        if (e) e.preventDefault();
        if (!selectedFile) return;
        setUploading(true);
        try {
            const Papa = (await import("papaparse")).default;
            Papa.parse(selectedFile, {
                header: false,
                skipEmptyLines: true,
                complete: (results) => {
                    // Map each row to { code, name }
                    const rows = results.data
                        .filter(row => Array.isArray(row) && row.length >= 2 && row[0] && row[1])
                        .map(row => ({ code: String(row[0]).trim(), name: String(row[1]).trim() }));
                    console.log("Parsed CSV rows:", rows);
                    if (rows.length === 0) {
                        setUploading(false);
                        alert("No valid rows found in CSV. Each row should have code,name.");
                        return;
                    }
                    uploadCourses();
                },
            });
        } catch (err) {
            setUploading(false);
            alert("Error parsing CSV file.");
        }
    };

    // Async upload function
    const uploadCourses = async () => {
        try {
            console.log("Uploading raw CSV file to backend...");
            const formData = new FormData();
            formData.append("file", selectedFile);
            const res = await fetch("/api/admin/courses/upload", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer admin-coursehub-cc23-golang", // TEMP: Remove for production!
                    // Do NOT set Content-Type for FormData
                },
                body: formData,
                credentials: "include",
            });
            // Always fetch latest courses after upload
            if (res.ok) {
                if (typeof onUpload === 'function') {
                    // Fetch latest courses from backend
                    const coursesRes = await fetch("/api/admin/dbcourses", {
                        headers: { "Authorization": "Bearer admin-coursehub-cc23-golang" },
                        credentials: "include",
                    });
                    const coursesData = await coursesRes.json();
                    if (Array.isArray(coursesData)) {
                        onUpload(coursesData);
                    } else if (Array.isArray(coursesData.courses)) {
                        onUpload(coursesData.courses);
                    }
                }
                setShowAddDialog(false);
                setSelectedFile(null);
                if (fileInput.current) fileInput.current.value = "";
            } else {
                const text = await res.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    data = { error: text };
                }
                alert("Upload failed: " + (data.error || data.message || JSON.stringify(data)));
            }
        } catch (err) {
            alert("Network or server error during upload.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", width: "100%", background: "#111" }}>
            {/* Add Courses Modal Dialog */}
            {showAddDialog && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <button
                            style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}
                            onClick={() => { setShowAddDialog(false); setSelectedFile(null); if (fileInput.current) fileInput.current.value = ""; }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 style={{ color: '#222', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Add Courses</h2>
                        <div style={{ color: '#555', marginBottom: 16, textAlign: 'center' }}>
                            Upload a CSV file. Each row: <b>code name</b> (no header required)
                        </div>
                        <input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            ref={fileInput}
                            onChange={handleFile}
                            style={{ marginBottom: 16, display: 'none' }}
                        />
                        <button
                            type="button"
                            className="browse-btn"
                            style={{ background: '#facc15', color: '#222', fontWeight: 700, borderRadius: 9999, padding: '10px 28px', fontSize: 16, border: 'none', cursor: 'pointer', marginTop: 8, marginBottom: 8 }}
                            onClick={() => fileInput.current && fileInput.current.click()}
                        >
                            Browse CSV
                        </button>
                        {selectedFile && (
                            <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: 8 }}>{selectedFile.name}</div>
                        )}
                        <button
                            type="button"
                            className="browse-btn"
                            style={{ background: selectedFile ? (uploading ? '#bbb' : '#16a34a') : '#bbb', color: '#fff', fontWeight: 700, borderRadius: 9999, padding: '10px 28px', fontSize: 16, border: 'none', cursor: selectedFile && !uploading ? 'pointer' : 'not-allowed', marginTop: 4 }}
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                        >
                            {uploading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center pb-8 w-full">
                {/* Heading */}
                <div className="w-full flex items-center mb-10">
                    <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 32, marginLeft: 40, letterSpacing: 1 }}>
                        Course Management
                    </h1>
                </div>
                {/* Search Bar + Add Courses Button */}
                <div className="w-full flex justify-center items-center mb-8 gap-4">
                    <div style={{ width: 400, maxWidth: 600, position: "relative" }}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses by code"
                            style={{ fontSize: 18, width: "100%", height: 44, padding: "0 48px 0 20px", borderRadius: 9999, border: "1px solid #e5e7eb", background: "#222", color: "#fff" }}
                        />
                        <button style={{ position: "absolute", right: 12, top: 10, width: 28, height: 28, background: "none", border: "none", cursor: "pointer" }} aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" style={{ width: 24, height: 24 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        type="button"
                        className="browse-btn"
                        style={{ background: "#facc15", color: "#222", fontWeight: 700, borderRadius: 9999, padding: "10px 28px", fontSize: 16, border: "none", cursor: "pointer", marginLeft: 8, display: 'inline-block' }}
                        onClick={() => setShowAddDialog(true)}
                    >
                        Add Courses
                    </button>
                </div>
                {/* Course Cards Grid */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", width: "100%" }}>
                    {courses && courses.length > 0 ? (
                        courses
                            .filter((c) => c.code && c.code !== "UNDEFINED" && c.code.toLowerCase().includes(search.toLowerCase()))
                            .map((course, idx) => (
                                <div
                                    key={course.code}
                                    className={styles.coursecard}
                                    style={{ background: CARD_COLORS[idx % CARD_COLORS.length], minWidth: 190, maxWidth: 220, height: 150, borderRadius: 16, boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)", border: "1px solid #eee", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span className={styles.code}>{course.code}</span>
                                        {editCode === course.code ? (
                                            <>
                                                <button
                                                    style={{ color: "#16a34a", fontWeight: 700, marginRight: 8, cursor: "pointer" }}
                                                    onClick={() => {
                                                        onRename(course.code, newName);
                                                        setEditCode(null);
                                                    }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    style={{ color: "#6b7280", fontWeight: 700, cursor: "pointer" }}
                                                    onClick={() => setEditCode(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            ((!course.name || course.name === "name" || course.name === "Name Unavailable") || course.code === "UNDEFINED") && (
                                                <button
                                                    style={{ background: "#facc15", color: "#fff", padding: "4px 12px", borderRadius: 8, fontWeight: 600, border: "none", cursor: "pointer" }}
                                                    onClick={() => {
                                                        setEditCode(course.code);
                                                        setNewName("");
                                                    }}
                                                >
                                                    Rename
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <div className={styles.name} style={{ marginTop: 8 }}>
                                        {editCode === course.code ? (
                                            <input
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                placeholder="Enter new name"
                                                style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "2px 8px", width: "100%" }}
                                            />
                                        ) : !course.name || course.name === "name" || course.name === "Name Unavailable" || course.code === "UNDEFINED" ? (
                                            <span className={styles.unnamed}>(unnamed)</span>
                                        ) : (
                                            <span title={course.name}>{course.name}</span>
                                        )}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div style={{ color: "#bbb", fontWeight: 600, fontSize: 18 }}>No courses found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseTable;