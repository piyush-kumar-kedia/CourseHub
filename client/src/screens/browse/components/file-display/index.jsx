import "./styles.scss";
import {
	formatFileName,
	formatFileSize,
	formatFileType,
} from "../../../../utils/formatFile";

const FileDisplay = ({ file }) => {
	const fileSize = formatFileSize(file.size);
	const fileType = formatFileType(file.name);
	const name = formatFileName(file.name);

	const handleDownload = () => {
		return;
	};
	return (
		<div className="file-display">
			<div className="img-preview">
				<div className="top">
					<span className="share"></span>
					<span className="download" onClick={handleDownload}></span>
					<span className="star"></span>
				</div>
				<div className="view">View</div>
			</div>
			<div className="content">
				<p className="title">
					{file?.name ? name : "Quiz 1 Answer Key"}
				</p>
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
