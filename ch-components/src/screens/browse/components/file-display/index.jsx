import "./styles.scss";

const FileDisplay = ({ file }) => {
	const name =
		file?.name.length > 20
			? file?.name.slice(0, 18) +
			  "..." +
			  file?.name.slice(file?.name.length - 4)
			: file?.name;

	const handleDownload = () => {
		window.open(file.downloadUrl);
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
					<p className="info">PDF 4.2MB</p>
					<p className="contributor">Atharva Tagalpallewar</p>
				</div>
			</div>
		</div>
	);
};

export default FileDisplay;
