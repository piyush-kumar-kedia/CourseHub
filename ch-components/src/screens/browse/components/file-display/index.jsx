import "./styles.scss";

const FileDisplay = ({ file }) => {
	const fileSize =
		parseFloat(file.size) > 1
			? parseFloat(file.size).toFixed(0) + "MB"
			: (parseFloat(file.size) * 1000).toFixed(0) + "KB";

	const fileType = (file?.name.slice(file?.name.length - 4).split("."))[0]
		? (file?.name.slice(file?.name.length - 4).split("."))[0]
		: (file?.name.slice(file?.name.length - 4).split("."))[1];

	const name =
		file?.name.length > 20
			? file?.name.slice(0, 16) +
			  "..." +
			  file?.name.slice(file?.name.length - 4)
			: file?.name;

	const handleDownload = () => {
		return;
		// window.open(file.downloadUrl);
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
