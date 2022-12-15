import "./styles.scss";
import Container from "../../components/container";
import Collapsible from "./components/collapsible";
import Navbar from "../../components/navbar";
import FolderInfo from "./components/folder-info";
import FileDisplay from "./components/file-display";
import BrowseFolder from "./components/browsefolder";
import { useSelector, useDispatch } from "react-redux";
import NavBarBrowseScreen from "./components/navbar";
import { useEffect } from "react";
import {
    ChangeCurrentYearData,
    ChangeFolder,
    LoadCourses,
} from "../../actions/filebrowser_actions";
const BrowseScreen = () => {
    const user = useSelector((state) => state.user);
    const folderData = useSelector((state) => state.fileBrowser.currentFolder);
    const currCourse = useSelector((state) => state.fileBrowser.currentCourse);

    const currYear = useSelector((state) => state.fileBrowser.currentYear);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    const dispatch = useDispatch();
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

    return (
        <Container color={"light"} type={"fluid"}>
            <div className="navbar-browse-screen">
                <NavBarBrowseScreen />
            </div>
            <div className="controller">
                <div className="left">
                    {user.myCourses.map((course, idx) => {
                        return <Collapsible color={course.color} key={idx} course={course} />;
                    })}
                </div>
                <div className="middle">
                    <FolderInfo
                        path={folderData?.path ? folderData.path : "Select a folder..."}
                        name={folderData?.name ? folderData.name : "Select a folder"}
                        canDownload={folderData?.childType === "File"}
                    />
                    <div className="files">
                        {folderData?.childType === "File"
                            ? folderData?.children.map((file) => (
                                  <FileDisplay
                                      file={file}
                                      key={file._id}
                                      path={folderData?.path ? folderData.path : "root"}
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
                    {/* <span className="year-title">YEAR</span> */}
                    <div className="year-content">
                        {currCourse &&
                            currCourse.map((course, idx) => {
                                // console.log(course);
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
        </Container>
    );
};

export default BrowseScreen;

{
    /* <Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#FFA7D4"} state={true} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} /> */
}
