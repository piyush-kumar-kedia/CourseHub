import "./styles.scss";
import { toast } from "react-toastify";
const FolderInfo = ({ path, name, canDownload, contributionHandler }) => {
    return (
        <div className="folder-info">
            <div className="info">
                <p className="path">{path}</p>
                <div className="curr-folder">
                    <p className="folder-name">{name}</p>
                    <div className="folder-actions">
                        <span
                            className="folder-action-icon favs"
                            onClick={() => {
                                toast("Added to favourites.");
                            }}
                        ></span>
                        <span className="folder-action-icon share"></span>
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
