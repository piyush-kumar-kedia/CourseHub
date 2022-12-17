import { useState } from "react";
import Folder from "./components/folder";
import FolderController from "./components/folder-controller";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { ChangeCurrentYearData, UpdateCourses } from "../../../../actions/filebrowser_actions";
import { ChangeFolder, ChangeCurrentCourse } from "../../../../actions/filebrowser_actions";
import { getCourse } from "../../../../api/Course";
import { useEffect } from "react";

const Collapsible = ({ course, color, state }) => {
    const [open, setOpen] = useState(state ? state : false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [initial, setInitial] = useState(true);
    const folderData = useSelector((state) => state.fileBrowser.currentYearFolderStructure);
    const currCourseCode = useSelector((state) => state.fileBrowser.currentCourseCode);
    const currentYear = useSelector((state) => state.fileBrowser.currentYear);
    const dispatch = useDispatch();

    const onClick = () => {
        setOpen(true);
    };

    const getCurrentCourse = async (code) => {
        let currCourse = null;
        try {
            currCourse = allCourseData.find((course) => course.code === code);
        } catch (error) {
            localStorage.removeItem("AllCourses");
            location.reload();
        }
        if (currCourse) console.log("Already present...");
        if (!currCourse) {
            try {
                currCourse = await getCourse(code);
                let temp = currCourse;
                currCourse = temp.data;
            } catch (error) {
                setLoading(false);
                setError(true);
                return null;
            }
            if (!allCourseData.find((course) => course.code === code)) {
                dispatch(UpdateCourses(currCourse));
            }
        }
        setLoading(false);
        return currCourse;
    };

    const triggerGetCourse = () => {
        const run = async () => {
            const t = await getCurrentCourse(course.code);
            if (t) {
                if (initial) {
                    dispatch(
                        ChangeCurrentYearData(
                            t.children.length - 1,
                            t.children?.[t.children.length - 1].children
                        )
                    );
                    dispatch(ChangeFolder(t.children?.[t.children.length - 1]));
                    setInitial(false);
                } else {
                    try {
                        // console.log(currentYear);
                        dispatch(
                            ChangeCurrentYearData(currentYear, t.children?.[currentYear].children)
                        );
                        dispatch(ChangeFolder(t.children?.[currentYear]));
                    } catch (error) {
                        console.log(error);
                        dispatch(
                            ChangeCurrentYearData(
                                t.children.length - 1,
                                t.children?.[t.children.length - 1].children
                            )
                        );
                        dispatch(ChangeFolder(t.children?.[t.children.length - 1]));
                        setInitial(false);
                    }
                }
                // console.log("t", t);
                dispatch(ChangeCurrentCourse(t.children, t.name));
            }
        };
        run();
    };

    const allCourseData = useSelector((state) => state.fileBrowser.allCourseData);
    // console.log(allCourseData);

    useEffect(() => {
        // console.log(currCourseCode);
        if (currCourseCode !== course.code.toUpperCase()) setOpen(false);
        if (currCourseCode === course.code.toUpperCase()) {
            triggerGetCourse();
            setOpen(true);
        }
        setInitial(true);
    }, [currCourseCode]);

    useEffect(() => {
        if (currCourseCode === course.code.toUpperCase()) {
            setInitial(false);
        }
    }, [currentYear]);

    return (
        <div className={`collapsible ${open}`}>
            <div className="main" onClick={onClick}>
                <div className="color" style={{ backgroundColor: color ? color : "#6F8FFE" }}></div>
                <div className="content" onClick={triggerGetCourse}>
                    <div className="text">
                        <p className="code">{course.code ? course.code.toUpperCase() : "CL 301"}</p>
                        <p className="name">
                            {course.name ? course.name : "Process Control and Instrumentation"}
                        </p>
                    </div>
                    <div className="arrow" onClick={() => {}}></div>
                </div>
            </div>
            <div className="collapsible-content">
                {!loading && !error ? (
                    <FolderController folders={folderData} />
                ) : loading ? (
                    "Loading Course Data, please wait..."
                ) : (
                    "Error loading course, please refresh!"
                )}
            </div>
        </div>
    );
};

export default Collapsible;
