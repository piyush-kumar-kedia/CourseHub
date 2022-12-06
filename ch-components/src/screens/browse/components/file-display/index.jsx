import "./styles.scss";
const FileDisplay = () => {
	return (
		<div className="file-display">
			<div className="img-preview">
				<div className="top">
					<span className="share"></span>
					<span className="download"></span>
					<span className="star"></span>
				</div>
				<div className="view">View</div>
			</div>
			<div className="content">
				<p className="title">Quiz 1 Answer Key</p>
				<div className="file-metadata">
					<p className="info">PDF 4.2MB</p>
					<p className="contributor">Atharva Tagalpallewar</p>
				</div>
			</div>
		</div>
	);
};

export default FileDisplay;
