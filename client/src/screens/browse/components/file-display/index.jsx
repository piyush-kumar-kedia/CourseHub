import "./styles.scss";
import { formatFileName, formatFileSize, formatFileType } from "../../../../utils/formatFile";
import { AddToFavourites } from "../../../../api/User";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavourites } from "../../../../actions/user_actions";
import { donwloadFile, previewFile } from "../../../../api/File";
import { AddPreviewUrl, AddDownloadUrl } from "../../../../actions/url_actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clientRoot from "../../../../api/client";
const FileDisplay = ({ file, path, code }) => {
    const fileSize = formatFileSize(file.size);
    const fileType = formatFileType(file.name);
    let name = file.name;
    let _dispName = formatFileName(name);
    let contributor = file.name;
    try {
        if (name.indexOf("~") !== -1) {
            _dispName = formatFileName(name.slice(0, name.indexOf("~")));
            contributor = name.slice(name.indexOf("~") + 1);
            contributor = contributor.slice(0, contributor.indexOf("."));
        } else {
            _dispName = formatFileName(name.slice(0, name.indexOf(fileType)));
            contributor = "Anonymous";
        }
    } catch (error) {
        name = formatFileName(file.name);
        contributor = "Anonymous";
    }
    const isLoggedIn = useSelector((state) => state.user?.loggedIn);
    const currCourseCode = useSelector((state) => state.fileBrowser?.currentCourseCode);
    const currFolderId = useSelector((state) => state.fileBrowser?.currentFolder?._id);

    const dispatch = useDispatch();

    const urls = useSelector((state) => state.URLS);

    const handleShare = () => {
        toast.info("Link copied to clipboard.");
        return;
    };

    const handleDownload = async () => {
        if (!isLoggedIn) {
            toast.error("Please login to download.");
            return;
        }
        const openedWindow = window.open("", "_blank");
        openedWindow.document.write("Please close this window after download starts.");
        const existingUrl = urls.downloadUrls.find((data) => data.id === file.id);
        if (existingUrl) {
            openedWindow.location.href = existingUrl.url;
            return;
        }
        const response = donwloadFile(file.id);
        toast.promise(response, {
            pending: "Generating download link...",
            success: "Downloading file....",
            error: "Something went wrong!",
        });
        response
            .then((data) => {
                dispatch(AddDownloadUrl(file.id, data.url));
                openedWindow.location.href = data.url;
            })
            .catch(() => {
                openedWindow.close();
            });
    };

    const handlePreview = async () => {
        if (!isLoggedIn) {
            toast.error("Please login to preview file.");
            return;
        }
        const openedWindow = window.open("", "_blank");
        openedWindow.document.write("Loading preview...");
        const existingUrl = urls.previewUrls.find((data) => data.id === file.id);
        if (existingUrl) {
            openedWindow.location.href = existingUrl.url;
            return;
        }
        const response = previewFile(file.id);
        toast.promise(response, {
            pending: "Loading preview...",
            error: "Something went wrong!",
        });
        response
            .then((data) => {
                dispatch(AddPreviewUrl(file.id, data.url));
                openedWindow.location.href = data.url;
            })
            .catch(() => {
                openedWindow.close();
            });
    };

    const handleAddToFavourites = async () => {
        const resp = await AddToFavourites(file.id, file.name, path, code);
        if (resp?.data?.favourites) {
            dispatch(UpdateFavourites(resp?.data?.favourites));
        }
    };

    return (
        <div className="file-display">
            <div
                className="img-preview"
                style={{
                    background: `url(${file.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="top">
                    <CopyToClipboard
                        text={`${clientRoot}/browse/${currCourseCode.toLowerCase()}/${currFolderId}`}
                    >
                        <span className="share" onClick={handleShare}></span>
                    </CopyToClipboard>
                    <span className="download" onClick={handleDownload}></span>
                    <span
                        className="star"
                        onClick={() => {
                            handleAddToFavourites();
                            toast("Added to favourites.");
                        }}
                    ></span>
                </div>
                <div className="view" onClick={handlePreview} title={file.name}>
                    View
                </div>
            </div>
            <div className="content">
                <p className="title" title={file.name}>
                    {file?.name ? _dispName : "Quiz 1 Answer Key"}
                </p>
                <div className="file-metadata">
                    <p className="info">
                        {fileType.toUpperCase()} {fileSize}
                    </p>
                    <p className="contributor">{contributor}</p>
                </div>
            </div>
        </div>
    );
};

export default FileDisplay;
