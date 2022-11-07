import React from "react";
import "./filebrowser.scss";
const FileBrowser = ({ courseData, getFolderData }) => {
	return (
		<div className="file-browser">
			<div className="btn-container">
				{courseData.folders.length === 0
					? "select a course"
					: courseData.folders.map((folder) => (
							<button
								className="btn-secondary"
								key={folder.data}
								onClick={() => getFolderData(folder.data)}
							>
								{folder.name}
							</button>
					  ))}
			</div>
		</div>
	);
};

export default FileBrowser;
