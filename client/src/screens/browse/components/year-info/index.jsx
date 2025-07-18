//import "./styles.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { addYear,deleteYear } from "../../../../api/Year";
import { getCourse } from "../../../../api/Course";
import { useDispatch } from "react-redux";
import { ChangeCurrentYearData,ChangeFolder,RefreshCurrentFolder } from "../../../../actions/filebrowser_actions";

import {ConfirmDialog} from "./confirmDialog";
import {ConfirmDelDialog} from "./confirmDelDialog";

const YearInfo = ({
    isBR,
    courseCode,
    course,
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
        console.log(yearName);
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

            await addYear({
                name: yearName.trim(),
                course: courseCode,
            });

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
            console.log(course[currYear]);
            await deleteYear({ folder: course[currYear], courseCode: courseCode });
            toast.success("Year deleted successfully!");
            const {data} = await getCourse(courseCode);
           
       
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
