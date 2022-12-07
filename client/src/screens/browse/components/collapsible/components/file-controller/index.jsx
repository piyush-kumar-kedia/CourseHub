import File from "../file/";
const FileController = ({ files }) => {
	return files && files.map((file) => <File file={file} key={file.name} />);
};

export default FileController;
