import "./styles.scss";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clientRoot from "../../../../api/client";
import Share from "../../../share";
import { useState } from "react";
import { createFolder } from "../../../../api/Folder";
import { getCourse } from "../../../../api/Course";
import { UpdateCourses } from "../../../../actions/filebrowser_actions";
import { AddNewCourseLocal } from "../../../../actions/user_actions";
import { useDispatch } from "react-redux";
import { RefreshCurrentFolder } from "../../../../actions/filebrowser_actions"; 
import {ConfirmDialog} from "./confirmDialog";

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
    const [showConfirm, setShowConfirm] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");


    const handleShare = () => {
        const sectionShare = document.getElementById("share");
        sectionShare.classList.add("show");
    };

    const handleCreateFolder = () => {
        setNewFolderName("");
        setShowConfirm(true);
    };

    const handleConfirmCreateFolder = async () => {
        const folderName = newFolderName.trim();
        if (!folderName?.trim()) return;

        if (!courseCode || !folderId) {
            toast.error("No course selected.");
            return;
        }

        try {
            const res = await getCourse(courseCode);
            if (!res.data?.found) {
                toast.error("Course not found. Cannot create folder.");
                return;
            }

            await createFolder({
                name: folderName.trim(),
                course: courseCode,
                parentFolder: folderId,
            });

            toast.success(`Folder "${folderName}" created`);
            dispatch(RefreshCurrentFolder());
        } catch (error) {
            toast.error("Failed to create folder.");
        }
        setShowConfirm(false);
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
                {canDownload ? (
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
                {isBR && !canDownload && (
                    <div className="btn-container">
                        <button className="btn plus" onClick={handleCreateFolder}>
                            <span className="icon plus-icon"></span>
                            <span className="text">Add Folder</span>
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
                onConfirm={handleConfirmCreateFolder}
                onCancel={() => setShowConfirm(false)}
                confirmText="Create"
                cancelText="Cancel"
            />
        </>
    );
};

export default FolderInfo;
