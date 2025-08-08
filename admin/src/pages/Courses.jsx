import React, { useState, useEffect } from "react";
import { FaPen, FaSearch, FaBook, FaPlus, FaEdit } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchCourses, updateCourseName } from "@/apis/courses";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [showOnlyNameless, setShowOnlyNameless] = useState(false);
    const [editingCode, setEditingCode] = useState(null);
    const [editedName, setEditedName] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
                setLoading(false);
            } catch (error) {
                setCourses([]);
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleRename = async (code, newName) => {
        try {
            const updated = await updateCourseName(code, newName);
            if (updated && updated.code) {
                setCourses((courses) =>
                    courses.map((c) => (c.code === updated.code ? { ...c, name: updated.name } : c))
                );
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const startEdit = (code, currentName) => {
        setEditingCode(code);
        setEditedName(currentName || "");
    };

    const cancelEdit = () => {
        setEditingCode(null);
        setEditedName("");
    };

    const saveEdit = () => {
        if (!editingCode) return;
        const newName = editedName.trim();
        if (!newName) return;
        handleRename(editingCode, newName);
        setEditingCode(null);
        setEditedName("");
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.code?.toLowerCase().includes(search.toLowerCase());
        const matchesNamelessFilter = showOnlyNameless ? !course.name : true;
        return matchesSearch && matchesNamelessFilter;
    });

    const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Ensure current page stays within range when filtering
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                <FaBook className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Courses
                                </h1>
                                <p className="text-gray-600 mt-2 text-lg">
                                    Manage and view all courses in the system
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <Badge
                                    variant="secondary"
                                    className="text-sm px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200"
                                >
                                    {filteredCourses.length} courses
                                </Badge>
                            </div>
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-200 transform hover:scale-105">
                                <FaPlus className="mr-2 h-4 w-4" />
                                Add Course
                            </Button>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="flex items-center gap-4">
                        <div className="relative max-w-md">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses by code..."
                                className="pl-12 bg-white/80 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                        </div>
                        <Button
                            variant={showOnlyNameless ? "default" : "outline"}
                            onClick={() => setShowOnlyNameless(!showOnlyNameless)}
                            className={`transition-all duration-200 ${
                                showOnlyNameless
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-md"
                                    : "bg-white/80 border-gray-200 hover:bg-yellow-50/80 hover:border-yellow-300"
                            }`}
                        >
                            {showOnlyNameless ? "Show All" : "Show Nameless Only"}
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-12">
                        <div className="flex items-center justify-center">
                            <div className="text-center space-y-6">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FaBook className="h-8 w-8 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-gray-900">
                                        Loading courses...
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        Please wait while we fetch the data
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100/50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Course List</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full border border-gray-200">
                                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                        {Math.min(
                                            currentPage * itemsPerPage,
                                            filteredCourses.length
                                        )}{" "}
                                        of {filteredCourses.length} results
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handlePageChange(Math.max(1, currentPage - 1))
                                                }
                                                disabled={currentPage === 1}
                                                className="h-8 w-8 p-0 hover:bg-gray-100 transition-all duration-200"
                                                title="Previous page"
                                            >
                                                <span className="text-sm font-bold">‹</span>
                                            </Button>
                                            <div className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-semibold min-w-[40px] text-center">
                                                {currentPage}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handlePageChange(
                                                        Math.min(totalPages, currentPage + 1)
                                                    )
                                                }
                                                disabled={currentPage === totalPages}
                                                className="h-8 w-8 p-0 hover:bg-gray-100 transition-all duration-200"
                                                title="Next page"
                                            >
                                                <span className="text-sm font-bold">›</span>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all duration-200">
                                        <TableHead className="w-[200px] font-semibold text-gray-700 py-4 pl-6">
                                            Course Code
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-700 py-4 pl-6">
                                            Course Name
                                        </TableHead>
                                        <TableHead className="w-[100px] font-semibold text-gray-700 py-4 pl-6">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedCourses.map((course, index) => (
                                        <TableRow
                                            key={course.code}
                                            className={`transition-all duration-200 ${
                                                hoveredRow === course.code
                                                    ? "bg-blue-50/80 shadow-sm"
                                                    : index % 2 === 0
                                                    ? "bg-white/60"
                                                    : "bg-gray-50/40"
                                            } hover:bg-blue-50/80 hover:shadow-sm`}
                                            onMouseEnter={() => setHoveredRow(course.code)}
                                            onMouseLeave={() => setHoveredRow(null)}
                                        >
                                            <TableCell className="font-mono font-semibold text-gray-900 py-4 pl-6">
                                                {course.code}
                                            </TableCell>
                                            <TableCell className="py-4 pl-6">
                                                {editingCode === course.code ? (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            value={editedName}
                                                            onChange={(e) =>
                                                                setEditedName(e.target.value)
                                                            }
                                                            placeholder="Enter course name"
                                                            className="h-9 max-w-md"
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") saveEdit();
                                                                if (e.key === "Escape")
                                                                    cancelEdit();
                                                            }}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            className="h-9 bg-blue-600 hover:bg-blue-700"
                                                            onClick={saveEdit}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-9"
                                                            onClick={cancelEdit}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                ) : course.name ? (
                                                    <span className="text-gray-900 font-medium">
                                                        {course.name}
                                                    </span>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100/80 transition-all duration-200"
                                                        onClick={() => startEdit(course.code, "")}
                                                    >
                                                        <FaPen className="mr-2 h-4 w-4" />
                                                        Add name
                                                    </Button>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-4 pl-6">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-blue-100/80 transition-all duration-200 transform hover:scale-110"
                                                        title="Edit course name"
                                                        onClick={() =>
                                                            startEdit(
                                                                course.code,
                                                                course.name || ""
                                                            )
                                                        }
                                                    >
                                                        <FaEdit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {paginatedCourses.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-40 text-center">
                                                <div className="text-center space-y-4">
                                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                                                        <FaBook className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-900">
                                                            No courses found
                                                        </p>
                                                        <p className="text-gray-500 mt-2">
                                                            {search
                                                                ? "Try adjusting your search terms"
                                                                : "No courses available"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Courses;
