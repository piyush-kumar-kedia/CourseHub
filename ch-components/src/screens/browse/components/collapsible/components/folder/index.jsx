import { useState } from "react";
import FolderController from "../folder-controller";

import "./styles.scss";

import { useDispatch, useSelector } from "react-redux";

import { ChangeFolder } from "../../../../../../actions/filebrowser_actions";
import { useEffect } from "react";

const Folder = ({ folder, state }) => {
	const dispatch = useDispatch();
	const _state = useSelector((state) => state.fileBrowser);
	const [open, setOpen] = useState(state ? state : false);
	// const [selected, setSelected] = useState("");
	// useEffect(() => {
	// 	console.log("rerender");
	// 	setSelected(_state.currentFolder?._id === folder._id ? "selected" : "");
	// }, [_state?.currentFolder]);
	const onClick = (folderData) => {
		dispatch(ChangeFolder(folderData));
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
					<div className="text" onClick={() => onClick(folder)}>
						{folder.name}
					</div>
				</div>
				<div className="children">
					{folder.childType === "Folder" && (
						<FolderController folders={folder.children} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Folder;
