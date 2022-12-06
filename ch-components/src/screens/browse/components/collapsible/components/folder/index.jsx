import { useState } from "react";
import FolderController from "../folder-controller";
import FileController from "../file-controller";
import "./styles.scss";
const Folder = ({ folder, state }) => {
	const [open, setOpen] = useState(state ? state : false);
	const onClick = () => {
		setOpen(!open);
	};
	return (
		<div className={`main-folder ${open}`}>
			<div className="folder-vertical-line">
				<span className="up"></span>
				<span className="down"></span>
			</div>
			<div className="main-content">
				<div className="folder">
					<div className="horizontal-line"></div>
					<div className="text" onClick={onClick}>
						{folder.name}
					</div>
				</div>
				<div className="children">
					{
						folder.childType === "Folder" && (
							<FolderController folders={folder.children} />
						)
						// : (
						// 	<FileController files={folder.children} />
						// )}
					}
				</div>
			</div>
		</div>
	);
};

export default Folder;
