//import "./styles.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { addYear,deleteYear } from "../../../../api/Year";
import { getCourse } from "../../../../api/Course";
import { useDispatch } from "react-redux";
import { ChangeCurrentYearData,ChangeFolder,LoadCourses,RefreshCurrentFolder} from "../../../../actions/filebrowser_actions";

import {ConfirmDialog} from "./confirmDialog";
import {ConfirmDelDialog} from "./confirmDelDialog";

const YearInfo = ({
    isBR,
    courseCode,
    course, // years list
    currYear,
}) => {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmDel, setShowConfirmDel] = useState(false);
    const [newYearName, setNewYearName] = useState("");

    const handleAddYear = () => {
        setNewYearName("");
        setShowConfirm(true);
    };

    const handleConfirmAddYear = async () => {
        const yearName = newYearName.trim();

        if(!yearName) return;
        if (!courseCode) {
            toast.error("No course selected.");
            return;
        }

        try {
            const res = await getCourse(courseCode);
            if (!res.data?.found) {
                toast.error("Course not found. Cannot add year.");
                return;
            }
            const newYear=await addYear({
                name: yearName.trim(),
                course: courseCode,
            });

            course.push(newYear);
            //dispatch(LoadCourses());
            dispatch(ChangeCurrentYearData(course.length-1, []));
            dispatch(ChangeFolder(newYear));

            toast.success(`Year "${yearName}" added`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to add year.");
        }
        setShowConfirm(false);
    };

    const handleDeleteYear = () => {
        setShowConfirmDel(true);
    };

    const handleConfirmDeleteYear = async (e) => {
        try {
            await deleteYear({ 
                folder: course[currYear], 
                courseCode: courseCode,
            });
            course.splice(currYear,1);
            // dispatch(LoadCourses());
            dispatch(ChangeCurrentYearData(course.length-1, []));
            dispatch(ChangeFolder(course[course.length-1]));

            toast.success("Year deleted successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete year.");
        }
        setShowConfirmDel(false);
    };

    const cancelDelete = () => {
        setShowConfirmDel(false);
    };

    return (
        <>
            <div>
                <div className="year-content">
                    {course &&
                        course.map((year, idx) => {
                            return (
                                <div>
                                    <span
                                        className={`year ${currYear === idx ? "selected" : ""}`}
                                        onClick={() => {
                                            dispatch(ChangeCurrentYearData(idx, course[idx].children));
                                            dispatch(ChangeFolder(course[idx]));
                                            dispatch(RefreshCurrentFolder());
                                        }}
                                        key={idx}
                                    >
                                        {year.name}
                                        {isBR?
                                            <div 
                                                className="delete" 
                                                onClick={handleDeleteYear}
                                                title="Delete Year"
                                            ></div>
                                            :null
                                        }
                                        
                                    </span>
                                    <ConfirmDelDialog
                                        isOpen={showConfirmDel}
                                        type="delete"
                                        onConfirm={handleConfirmDeleteYear}
                                        onCancel={cancelDelete}
                                    />
                                </div>
                            );
                        })}
                </div>
                {isBR?
                    <div className="year-content year add-year">
                        {course &&
                            <div>
                                <div className="">
                                    <span className="" onClick={handleAddYear}>
                                        <span className="text">New Year</span>
                                    </span>
                                </div>
                                <ConfirmDialog
                                    show={showConfirm}
                                    input={true}
                                    // inputValue={newFolderName}
                                    // onInputChange={(e) => setNewFolderName(e.target.value)}
                                    yearName={newYearName}
                                    onYearNameChange={setNewYearName}
                                    onConfirm={handleConfirmAddYear}
                                    onCancel={() => setShowConfirm(false)}
                                    confirmText="Create"
                                    cancelText="Cancel"
                                    course={course}
                                />
                            </div>
                        }
                    </div>
                    :null
                }
            </div>
        </>
    );
};

export default YearInfo;
