import React from "react";
import "./file.scss";
const File = ({ name, type, data }) => {
	return (
		<div className="btn-primary m-b m-r">
			<div className="title">
				{name} <span> | </span>
				<span className="type">{type}</span>
			</div>
			{/* <div className="type"> | {type}</div> */}
		</div>
	);
};

export default File;
