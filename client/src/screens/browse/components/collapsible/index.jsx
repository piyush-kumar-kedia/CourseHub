import { useState } from "react";
import Folder from "./components/folder";
import FolderController from "./components/folder-controller";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { ChangeCurrentYearData, UpdateCourses } from "../../../../actions/filebrowser_actions";
import { ChangeFolder, ChangeCurrentCourse } from "../../../../actions/filebrowser_actions";
import { getCourse } from "../../../../api/Course";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import searchFolderById from "../../../../utils/searchFolderById";
import { toast } from "react-toastify";
import { capitalise } from "../../../../utils/capitalise";

const Collapsible = ({ course, color, state }) => {
    const [open, setOpen] = useState(state ? state : false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [initial, setInitial] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const folderData = useSelector((state) => state.fileBrowser.currentYearFolderStructure);
    const currCourseCode = useSelector((state) => state.fileBrowser.currentCourseCode);
    const currentYear = useSelector((state) => state.fileBrowser.currentYear);
    const currentCourse = useSelector((state) => state.fileBrowser.currentCourse);
    const dispatch = useDispatch();

    const onClick = () => {
        if (initial && !open) triggerGetCourse();
        setOpen(!open);
    };

    const getCurrentCourse = async (code) => {
        let currCourse = null;
        let insessionStorage = null;
        try {
            currCourse = allCourseData.find(
                (course) => course.code.toLowerCase() === code.toLowerCase()
            );
        } catch (error) {
            sessionStorage.removeItem("AllCourses");
            location.reload();
        }
        try {
            const allLocal = JSON.parse(sessionStorage.getItem("AllCourses"));
            insessionStorage = allLocal?.find(
                (course) => course.code.toLowerCase() === code.toLowerCase()
            );
        } catch (error) {
            sessionStorage.removeItem("AllCourses");
            location.reload();
        }
        if (currCourse || insessionStorage) {
            // console.log("Already present...");
        }
        if (!currCourse) {
            try {
                let loadingCourseToastId = toast.loading("Loading course data...");
                currCourse = await getCourse(code.replaceAll(" ", ""));
                // console.log("req");
                const { data } = currCourse;
                if (!data.found) {
                    setError(false);
                    setNotFound(true);
                    setLoading(false);
                    toast.dismiss(loadingCourseToastId);
                    toast.error("Course data not found!");
                    return;
                }
                toast.dismiss(loadingCourseToastId);
                setNotFound(false);
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
                        dispatch(
                            ChangeCurrentYearData(currentYear, t.children?.[currentYear].children)
                        );
                        if (!folderId) {
                            dispatch(ChangeFolder(t.children?.[currentYear]));
                            folderId = null;
                        }
                    } catch (error) {
                        // console.log(error);
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
                dispatch(ChangeCurrentCourse(t.children, t.code));
            }
        };
        run();
    };

    const allCourseData = useSelector((state) => state.fileBrowser.allCourseData);

    useEffect(() => {
        // console.log(currCourseCode);
        // console.log(course);
        if (currCourseCode?.toLowerCase() !== course.code?.toLowerCase()) setOpen(false);
        if (currCourseCode?.toLowerCase() === course.code?.toLowerCase()) {
            // console.log("called");
            triggerGetCourse();
            setOpen(true);
        }
        setInitial(true);
    }, [currCourseCode]);

    useEffect(() => {
        if (currCourseCode?.toLowerCase() === course.code?.toLowerCase()) {
            setInitial(false);
        }
    }, [currentYear]);

    let { code, folderId } = useParams();

    useEffect(() => {
        if (initial) return;
        if (code && folderId && code?.toLowerCase() === course.code?.toLowerCase()) {
            // console.log(course);
            try {
                let searchedFolder = searchFolderById(currentCourse, folderId);
                // console.log("searched folder", searchedFolder);
                if (searchedFolder) {
                    dispatch(ChangeFolder(searchedFolder));
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [initial, currentCourse]);

    return (
        <div className={`collapsible ${open}`}>
            <div className="main" onClick={onClick}>
                <div className="color" style={{ backgroundColor: color ? color : "#6F8FFE" }}></div>
                <div className="content">
                    <div className="text">
                        <p className="code">{course.code ? course.code.toUpperCase() : "CL 301"}</p>
                        <p className="name">
                            {course.name
                                ? capitalise(course.name)
                                : "Process Control and Instrumentation"}
                        </p>
                    </div>
                    <div className="arrow"></div>
                </div>
            </div>
            <div className="collapsible-content">
                {loading && "loading..."}
                {error && "error"}
                {notFound && "course not added yet"}
                {!loading && !error && !notFound && <FolderController folders={folderData} />}
            </div>
        </div>
    );
};

export default Collapsible;
