import Folder from "../folder";

const FolderController = ({ folders }) => {
	return (
		folders &&
		folders.map((folder) => <Folder folder={folder} key={folder._id} />)
	);
};

export default FolderController;
