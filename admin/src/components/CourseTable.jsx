import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Pagination,
} from "@shadcn/ui";
import { FaPen } from "react-icons/fa";

const CourseTable = ({ courses, onRename, currentPage, itemsPerPage, onPageChange }) => {
    const paginatedCourses = courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedCourses.map((course) => (
                        <TableRow key={course.code}>
                            <TableCell className="text-center">{course.code}</TableCell>
                            <TableCell className="text-center">
                                {course.name || (
                                    <FaPen
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => {
                                            const newName = prompt(
                                                "Enter new name for the course:"
                                            );
                                            if (newName) onRename(course.code, newName);
                                        }}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                {/* Additional actions can be added here */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalItems={courses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default CourseTable;
