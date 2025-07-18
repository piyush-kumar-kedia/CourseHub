//import "./styles.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { addYear } from "../../../../api/Year";
import { getCourse } from "../../../../api/Course";
import { useDispatch } from "react-redux";
import { ChangeCurrentYearData,ChangeFolder,RefreshCurrentFolder } from "../../../../actions/filebrowser_actions";

import {ConfirmDialog} from "./confirmDialog";

const YearInfo = ({
    isBR,
    courseCode,
    course,
    currYear,
}) => {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);
    const [newYearName, setNewYearName] = useState("");

    const handleAddYear = () => {
        setNewYearName("");
        setShowConfirm(true);
    };

    const handleConfirmAddYear = async () => {
        const yearName = newYearName.trim();

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

    return (
        <>
            <div>
            <div className="year-content">
                {course &&
                    course.map((year, idx) => {
                        return (
                            <span
                                className={`year ${currYear === idx ? "selected" : ""}`}
                                onClick={() => {
                                    dispatch(
                                        ChangeCurrentYearData(idx, course[idx].children)
                                    );
                                    dispatch(ChangeFolder(course[idx]));
                                    dispatch(RefreshCurrentFolder());
                                }}
                                key={idx}
                            >
                                {year.name}
                            </span>
                        );
                    })}
            </div>
            <div className="year-content year add-year">
                {course &&
                    <div>
                        <div className="">
                            <span className="" onClick={handleAddYear}>
                                <span className="text">Add Year</span>
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
        </div>

            
        </>
    );
};

export default YearInfo;
