import "./styles.scss";
import Container from "../../components/container";
import Collapsible from "./components/collapsible";
import Navbar from "../../components/navbar";
import FolderInfo from "./components/folder-info";
import FileDisplay from "./components/file-display";
import BrowseFolder from "./components/browsefolder";
import { useSelector, useDispatch } from "react-redux";
import NavBarBrowseScreen from "./components/navbar";
import Contributions from "../contributions";
import { useEffect, useState } from "react";
import {
    ChangeCurrentCourse,
    ChangeCurrentYearData,
    ChangeFolder,
    LoadCourses,
    UpdateCourses,
} from "../../actions/filebrowser_actions";
import { getColors } from "../../utils/colors";
import { AddNewCourseLocal, LoginUser, LogoutUser } from "../../actions/user_actions";
import { getUser } from "../../api/User";
import { useParams } from "react-router-dom";
import { getCourse } from "../../api/Course";
import { toast } from "react-toastify";

const BrowseScreen = () => {
    const user = useSelector((state) => state.user);
    const folderData = useSelector((state) => state.fileBrowser.currentFolder);
    const currCourse = useSelector((state) => state.fileBrowser.currentCourse);
    const currCourseCode = useSelector((state) => state.fileBrowser.currentCourseCode);
    const currYear = useSelector((state) => state.fileBrowser.currentYear);
    const allCourseData = useSelector((state) => state.fileBrowser.allCourseData);

    const contributionHandler = (event) => {
        const collection = document.getElementsByClassName("contri");
        const contributionSection = collection[0];
        contributionSection.classList.add("show");
    };
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { code, folderId } = useParams();
    const fb = useSelector((state) => state.fileBrowser);

    useEffect(() => {
        if (localStorage.getItem("AllCourses") !== null) {
            try {
                dispatch(LoadCourses(JSON.parse(localStorage.getItem("AllCourses"))));
            } catch (error) {
                dispatch(LoadCourses([]));
                console.log("load error");
            }
        }
    }, []);

    useEffect(() => {
        async function getAuth() {
            try {
                const { data } = await getUser();
                if (!data) {
                    dispatch(LogoutUser());
                    setLoading(false);
                    return;
                }
                dispatch(LoginUser(data));
                setLoading(false);
            } catch (error) {
                dispatch(LogoutUser());
                console.log(error.message);
                setLoading(false);
            }
        }
        if (!user?.loggedIn) getAuth();
    }, []);

    useEffect(() => {
        if (loading || !code) return;
        const run = async () => {
            let localStorageCourses = null;
            let fetchedData = null;

            try {
                localStorageCourses = JSON.parse(localStorage.getItem("AllCourses"));
            } catch (error) {
                localStorageCourses = null;
            }

            let currCourse = null;
            try {
                currCourse = allCourseData?.find(
                    (course) => course.code?.toLowerCase() === code?.toLowerCase()
                );
            } catch (error) {
                localStorage.removeItem("AllCourses");
                location.reload();
            }
            const present = localStorageCourses?.find(
                (course) => course.code?.toLowerCase() === code.toLowerCase()
            );
            let root = [];
            if (present || currCourse) {
                console.log("found in localstorage");
                fetchedData = present;
                // console.log(fetchedData);
                root = fetchedData;
                dispatch(AddNewCourseLocal(fetchedData));
            } else {
                let fetchingToast = toast.loading("Loading course data...");
                fetchedData = await getCourse(code.toLowerCase());
                if (fetchedData.data.found) {
                    toast.dismiss(fetchingToast);
                    dispatch(UpdateCourses(fetchedData.data));
                    dispatch(AddNewCourseLocal(fetchedData.data));
                    root = fetchedData.data;
                } else {
                    toast.dismiss(fetchingToast);
                    toast.error("Course not found!");
                }
            }
            dispatch(ChangeCurrentCourse(null, code));
        };
        run();
        console.log("code search");
    }, [loading]);

    useEffect(() => {
        console.log(fb);
        // console.log(user);
    }, [fb, user]);
    return (
        <Container color={"light"} type={"fluid"}>
            <div className="navbar-browse-screen">
                <NavBarBrowseScreen />
            </div>
            <div className="controller">
                <div className="left">
                    {user.user?.courses?.map((course, idx) => {
                        return <Collapsible color={getColors(idx)} key={idx} course={course} />;
                    })}
                    {user.localCourses?.map((course, idx) => {
                        return <Collapsible color={course.color} key={idx} course={course} />;
                    })}
                </div>
                <div className="middle">
                    <FolderInfo
                        path={folderData?.path ? folderData.path : "Select a folder..."}
                        name={folderData?.name ? folderData.name : "Select a folder"}
                        canDownload={folderData?.childType === "File"}
                        contributionHandler={contributionHandler}
                        folderId={folderData?._id}
                        courseCode={folderData?.course}
                    />
                    <div className="files">
                        {!folderData
                            ? "Select a course"
                            : folderData?.childType === "File"
                            ? folderData?.children?.map((file) => (
                                  <FileDisplay
                                      file={file}
                                      key={file._id}
                                      path={folderData?.path ? folderData.path : "root"}
                                      code={currCourseCode}
                                  />
                              ))
                            : folderData?.children.map((folder) => (
                                  <BrowseFolder
                                      type="folder"
                                      key={folder._id}
                                      path={folder.path}
                                      name={folder.name}
                                      subject={folder.course}
                                      folderData={folder}
                                  />
                              ))}
                    </div>
                </div>
                <div className="right">
                    <div className="year-content">
                        {currCourse &&
                            currCourse.map((course, idx) => {
                                return (
                                    <span
                                        className={`year ${currYear === idx ? "selected" : ""}`}
                                        onClick={() => {
                                            dispatch(
                                                ChangeCurrentYearData(idx, currCourse[idx].children)
                                            );
                                            dispatch(ChangeFolder(currCourse[idx]));
                                        }}
                                        key={idx}
                                    >
                                        {course.name}
                                    </span>
                                );
                            })}
                    </div>
                </div>
            </div>
            <Contributions />
        </Container>
    );
};

export default BrowseScreen;
