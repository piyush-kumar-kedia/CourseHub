import "./styles.scss";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clientRoot from "../../../../api/client";
const FolderInfo = ({ path, name, canDownload, contributionHandler, folderId, courseCode }) => {
    const handleShare = () => {
        toast.info("Link copied to clipboard.");
        return;
    };
    return (
        <div className="folder-info">
            <div className="info">
                <p className="path">{path}</p>
                <div className="curr-folder">
                    <p className="folder-name">{name}</p>
                    <div className="folder-actions">
                        {folderId && courseCode && (
                            <>
                                <span
                                    className="folder-action-icon favs"
                                    onClick={() => {
                                        toast("Added to favourites.");
                                    }}
                                ></span>
                                <CopyToClipboard
                                    text={`${clientRoot}/browse/${courseCode}/${folderId}`}
                                >
                                    <span
                                        className="folder-action-icon share"
                                        onClick={handleShare}
                                    ></span>
                                </CopyToClipboard>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="btn-container">
                <button
                    className="btn download"
                    style={{ display: canDownload ? "inline-block" : "none" }}
                >
                    <span className="icon download-icon"></span>
                    <span className="text">Download All Files</span>
                </button>
                <button className="btn plus" onClick={contributionHandler}>
                    <span className="icon plus-icon"></span>
                    <span className="text">Contribute</span>
                </button>
            </div>
        </div>
    );
};

export default FolderInfo;
