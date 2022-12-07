import React from "react";
import "./display.scss";
import File from "../file/file";

import Loader from "../../../../components/loader/Loader";
const Display = ({ files, loading }) => {
	return (
		<div className="display">
			<div className="file-container">
				{files.length === 0 &&
					(loading ? <Loader /> : "select a folder")}
				{files.map((file) => (
					<File
						key={file._id}
						name={file.name}
						type={file.type}
						data={file.data}
					/>
				))}
			</div>
		</div>
	);
};

export default Display;
