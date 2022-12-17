import "./styles.scss";
import { formatFileName, formatFileSize, formatFileType } from "../../../../utils/formatFile";
import { AddToFavourites } from "../../../../api/User";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavourites } from "../../../../actions/user_actions";
import { donwloadFile, previewFile } from "../../../../api/File";
import { AddPreviewUrl, AddDownloadUrl } from "../../../../actions/url_actions";

const FileDisplay = ({ file, path, code }) => {
    const fileSize = formatFileSize(file.size);
    const fileType = formatFileType(file.name);
    const name = formatFileName(file.name);

    const dispatch = useDispatch();

    const urls = useSelector((state) => state.URLS);

    const handleDownload = async () => {
        const existingUrl = urls.downloadUrls.find((data) => data.id === file.id);
        // console.log(existingUrl);
        if (existingUrl) {
            toast.success("Downloading...");
            window.open(existingUrl.url, "_blank");
            return;
        }
        const response = await toast.promise(donwloadFile(file.id), {
            pending: "Generating download link...",
            success: "Downloading file....",
            error: "Something went wrong!",
        });
        dispatch(AddDownloadUrl(file.id, response.url));
        window.open(response.url, "_blank");
    };

    const handlePreview = async () => {
        const existingUrl = urls.previewUrls.find((data) => data.id === file.id);
        // console.log(existingUrl);
        if (existingUrl) {
            window.open(existingUrl.url, "_blank");
            return;
        }
        const response = await toast.promise(previewFile(file.id), {
            pending: "Generating preview link...",
            success: "Success!",
            error: "Something went wrong!",
        });
        dispatch(AddPreviewUrl(file.id, response.url));
        window.open(response.url, "_blank");
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
                    <span className="share"></span>
                    <span className="download" onClick={handleDownload}></span>
                    <span
                        className="star"
                        onClick={() => {
                            handleAddToFavourites();
                            toast("Added to favourites.");
                        }}
                    ></span>
                </div>
                <div className="view" onClick={handlePreview}>
                    View
                </div>
            </div>
            <div className="content">
                <p className="title">{file?.name ? name : "Quiz 1 Answer Key"}</p>
                <div className="file-metadata">
                    <p className="info">
                        {fileType.toUpperCase()} {fileSize}
                    </p>
                    <p className="contributor">Atharva Tagalpallewar</p>
                </div>
            </div>
        </div>
    );
};

export default FileDisplay;
