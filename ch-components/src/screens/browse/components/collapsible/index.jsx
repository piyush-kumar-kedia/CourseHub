import { useState } from "react";
import Folder from "./components/folder";
import FolderController from "./components/folder-controller";
import "./styles.scss";

import { useSelector } from "react-redux";

const Collapsible = ({ color, state }) => {
	const [open, setOpen] = useState(state ? state : false);
	const onClick = () => {
		setOpen(!open);
	};
	const allCourseData = useSelector(
		(state) => state.fileBrowser.allCourseData
	);
	console.log(allCourseData);
	return (
		<div className={`collapsible ${open}`}>
			<div className="main" onClick={onClick}>
				<div
					className="color"
					style={{ backgroundColor: color ? color : "#6F8FFE" }}
				></div>
				<div className="content">
					<div className="text">
						<p className="code">CL 301</p>
						<p className="name">
							Process Control and Instrumentation
						</p>
					</div>
					<div className="arrow"></div>
				</div>
			</div>
			<div className="collapsible-content">
				<FolderController folders={allCourseData} />
			</div>
		</div>
	);
};

export default Collapsible;
