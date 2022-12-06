import Folder from "../folder";

const FolderController = ({ folders }) => {
	return (
		folders &&
		folders.map((folder) => <Folder folder={folder} key={folder.name} />)
	);
};

export default FolderController;
