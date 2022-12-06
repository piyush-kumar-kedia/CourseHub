import "./styles.scss";
import Container from "../../components/container";
import Collapsible from "./components/collapsible";
import Navbar from "../../components/navbar";
import FolderInfo from "./components/folder-info";
import FileDisplay from "./components/file-display";
import { useSelector } from "react-redux";
const BrowseScreen = () => {
	const user = useSelector((state) => state.user);
	const folderData = useSelector((state) => state.fileBrowser.currentFolder);

	return (
		<Container color={"light"} type={"fluid"}>
			<div className="navbar-browse-screen">NAVBAR 10vh</div>
			<div className="controller">
				<div className="left">
					{user.myCourses.map((course, idx) => {
						return (
							<Collapsible
								color={course.color}
								key={idx}
								course={course}
							/>
						);
					})}
				</div>
				<div className="middle">
					<FolderInfo
						path={"Home > CL 303 > Exams"}
						name={
							folderData?.name
								? folderData.name
								: "Select a folder"
						}
					/>
					<div className="files">
						{folderData?.childType === "File"
							? folderData.children.map((file) => (
									<FileDisplay file={file} key={file._id} />
							  ))
							: "<FOLDER DISPLAY HERE>"}
					</div>
				</div>
				<div className="right">right display</div>
			</div>
		</Container>
	);
};

export default BrowseScreen;

{
	/* <Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#FFA7D4"} state={true} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} /> */
}
