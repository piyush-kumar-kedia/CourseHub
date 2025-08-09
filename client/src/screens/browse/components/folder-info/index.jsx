import "./styles.scss";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clientRoot from "../../../../api/client";
import Share from "../../../share";
import { useState } from "react";
import { createFolder } from "../../../../api/Folder";
import { getCourse } from "../../../../api/Course";
import { ChangeCurrentCourse, ChangeCurrentYearData, ChangeFolder, UpdateCourses } from "../../../../actions/filebrowser_actions";
import { AddNewCourseLocal } from "../../../../actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCurrentFolder } from "../../../../actions/filebrowser_actions";
import { ConfirmDialog } from "./confirmDialog";
import server from "../../../../api/server";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
    const [showConfirm, setShowConfirm] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [childType, setChildType] = useState("File");

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
        const folderName = newFolderName.trim();
        if (!folderName?.trim() || !childType) return;

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
    };

    const downloadFolder = async (id, folderPath = "") => {
    try {
        const response = await fetch(`${server}/api/folder/content/${id}`);
        if (!response.ok) {
            toast.error("Failed to download folder content.");
            return null;
        }
        
        const data = await response.json();
        const zip = new JSZip();
        
        // Process all children
        const childType = data.childType || "File"; // Default to "File" if not specified

        for (const child of data.children) {
            if (childType === "older") {
                // Recursive case: child is a folder
                const childFolderPath = folderPath ? `${folderPath}/${child.name}` : child.name;
                
                // Recursively download the child folder
                const childZip = await downloadFolder(child._id, childFolderPath);
                
                if (childZip) {
                    // Add all files from child folder to current zip
                    childZip.forEach((relativePath, file) => {
                        // Add the folder structure to the path
                        const fullPath = folderPath ? `${folderPath}/${relativePath}` : relativePath;
                        zip.file(fullPath, file);
                    });
                }
            } else {
                // Base case: child is a file
                try {

                    console.log(child);

                    const getFileResponse = await fetch(`${server}/api/files/link/${child._id}`);
                    if (!getFileResponse.ok) {
                        toast.error(`Failed to get link for file: ${child.name}`);
                        continue;
                    }
                    const fileUrlData = await getFileResponse.json();
                    const UrlLink = fileUrlData.webUrl;
                    const fileResponse = await fetch(`${server}/api/files/download`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ url : UrlLink }),
                    });
                    
                    if (!fileResponse.ok) {
                        toast.error(`Failed to download file: ${child.name}`);
                        continue;
                    }

                    const fileData = await fileResponse.json();
                    const downloadLink = fileData.downloadLink;

                    const curfile = await fetch(downloadLink);
                    const fileBlob = await curfile.blob();

                    // Add file to zip with proper folder structure
                    const filePath = folderPath ? `${folderPath}/${child.name}` : child.name;
                    zip.file(filePath, fileBlob);
                } catch (error) {
                    console.error(`Error downloading file ${child.name}:`, error);
                    toast.error(`Failed to download file: ${child.name}`);
                }
            }
        }

        return zip;
    } catch (error) {
        console.error(`Error downloading folder content:`, error);
        toast.error("Failed to download folder content.");
        return null;
    }
};

// Usage function to initiate download and save the ZIP
const downloadAndSaveFolder = async (folderId, folderName = "folder") => {
    try {
        toast.info("Starting folder download...");
        
        const zip = await downloadFolder(folderId);
        
        if (!zip) {
            toast.error("Failed to create folder archive.");
            return;
        }

        // Generate the final ZIP blob
        const zipBlob = await zip.generateAsync({ 
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: { level: 6 }
        });

        // Save the ZIP file using saveAs
        saveAs(zipBlob, `${folderName}.zip`);

        toast.success("Folder downloaded successfully!");
    } catch (error) {
        console.error("Error in downloadAndSaveFolder:", error);
        toast.error("Failed to download folder.");
    }
};


    return (
        <>
            <div className="folder-info">
            <button onClick={downloadAndSaveFolder(folderId)}>download</button>
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
                childType={childType}
                onChildTypeChange={setChildType}
                onConfirm={handleConfirmCreateFolder}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default FolderInfo;
