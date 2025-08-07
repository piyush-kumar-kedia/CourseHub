import "./styles.scss";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clientRoot from "../../../../api/client";
import Share from "../../../share";
import { useState } from "react";
import { createFolder } from "../../../../api/Folder";
import { getCourse } from "../../../../api/Course";
import {
    ChangeCurrentCourse,
    ChangeCurrentYearData,
    ChangeFolder,
    UpdateCourses,
} from "../../../../actions/filebrowser_actions";
import { AddNewCourseLocal } from "../../../../actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCurrentFolder } from "../../../../actions/filebrowser_actions";
import { ConfirmDialog } from "./confirmDialog";

const FolderInfo = ({
    isBR,
    path,
    name,
    canDownload,
    contributionHandler,
    folderId,
    courseCode,
}) => {
    const dispatch = useDispatch();
    const currYear = useSelector((state) => state.fileBrowser.currentYear);
    const currentData = useSelector((state) => state.fileBrowser.currentData);
    const [showConfirm, setShowConfirm] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [childType, setChildType] = useState("File");
    const [isAdding, setIsAdding] = useState(false);

    const user = useSelector((state) => state.user.user);
    const isReadOnlyCourse = user?.readOnly?.some(
        (c) => c.code.toLowerCase() === courseCode?.toLowerCase()
    );

    const handleShare = () => {
        const sectionShare = document.getElementById("share");
        sectionShare.classList.add("show");
    };

    const handleCreateFolder = () => {
        setNewFolderName("");
        setChildType("File");
        setShowConfirm(true);
    };

    const handleConfirmCreateFolder = async () => {
        if (isAdding) return;
        setIsAdding(true);
        const folderName = newFolderName.trim();
        if (!folderName?.trim() || !childType) {
            setIsAdding(false);
            return;
        }

        if (
            currentData &&
            currentData.some((item) => item.name.toLowerCase() === folderName.toLowerCase())
        ) {
            toast.error(`A file or folder named "${folderName}" already exists.`);
            setIsAdding(false);
            return;
        }

        if (!courseCode || !folderId) {
            toast.error("No course selected.");
            setIsAdding(false);
            return;
        }

        try {
            const res = await getCourse(courseCode);
            if (!res.data?.found) {
                toast.error("Course not found. Cannot create folder.");
                setIsAdding(false);
                return;
            }

            await createFolder({
                name: folderName.trim(),
                course: courseCode,
                parentFolder: folderId,
                childType: childType,
            });
            const { data } = await getCourse(courseCode);
            dispatch(UpdateCourses(data));
            dispatch(ChangeCurrentYearData(currYear, data.children[currYear].children));
            dispatch(RefreshCurrentFolder());
            toast.success(`Folder "${folderName}" created`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create folder.");
        }
        setShowConfirm(false);
        setIsAdding(false);
    };

    return (
        <>
            <div className="folder-info">
                <div className="info">
                    <p className="path">{path}</p>
                    <div className="curr-folder">
                        <p className="folder-name">{name}</p>
                        <div className="folder-actions">
                            {folderId && courseCode && (
                                <>
                                    {/* <span
                                        className="folder-action-icon favs"
                                        onClick={() => {
                                            toast("Added to favourites.");
                                        }}
                                    ></span> */}
                                    <span
                                        className="folder-action-icon share"
                                        onClick={handleShare}
                                    ></span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {!isReadOnlyCourse && canDownload ? (
                    <div className="btn-container">
                        {/* <button
                            className="btn download"
                            style={{ display: canDownload ? "inline-block" : "none" }}
                        >
                            <span className="icon download-icon"></span>
                            <span className="text">Download All Files</span>
                        </button> */}
                        <div className="btn-container">
                            <button className="btn plus" onClick={contributionHandler}>
                                <span className="icon plus-icon"></span>
                                <span className="text">{isBR ? "Add File" : "Contribute"}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {!isReadOnlyCourse && isBR && !canDownload && (
                    <div className="btn-container">
                        <button
                            className="btn plus"
                            onClick={handleCreateFolder}
                            disabled={isAdding}
                        >
                            <span className="icon plus-icon"></span>
                            <span className="text">{isAdding ? "Creating..." : "Add Folder"}</span>
                        </button>
                    </div>
                )}
            </div>
            <Share link={`${clientRoot}/browse/${courseCode}/${folderId}`} />
            <ConfirmDialog
                show={showConfirm}
                input={true}
                inputValue={newFolderName}
                onInputChange={(e) => setNewFolderName(e.target.value)}
                childType={childType}
                onChildTypeChange={setChildType}
                onConfirm={handleConfirmCreateFolder}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default FolderInfo;
