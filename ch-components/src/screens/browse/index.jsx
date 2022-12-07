import "./styles.scss";
import Container from "../../components/container";
import Collapsible from "./components/collapsible";
import Navbar from "../../components/navbar";
import FolderInfo from "./components/folder-info";
import FileDisplay from "./components/file-display";
import BrowseFolder from "./components/browsefolder";
import { useSelector } from "react-redux";
import NavBarBrowseScreen from "./components/navbar";
const BrowseScreen = () => {
	const user = useSelector((state) => state.user);
	const folderData = useSelector((state) => state.fileBrowser.currentFolder);

	return (
		<Container color={"light"} type={"fluid"}>
			<div className="navbar-browse-screen">
				<NavBarBrowseScreen />
			</div>
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
						path={
							folderData?.path
								? folderData.path
										.split("/")
										.map((folder) => folder + " > ")
								: "root"
						}
						name={
							folderData?.name
								? folderData.name
								: "Select a folder"
						}
					/>
					<div className="files">
						{folderData?.childType === "File"
							? folderData?.children.map((file) => (
									<FileDisplay file={file} key={file._id} />
							  ))
							: folderData?.children.map((folder) => (
									<BrowseFolder
										type="folder"
										key={folder._id}
										path={folder.path}
										name={folder.name}
										subject={folder.course}
										folderData={folder}
									/>
							  ))}
					</div>
				</div>
				<div className="right">
					<div className="year-content">
						<span className="year-title">YEAR</span>
						<span className="year">2022</span>
						<span className="year selected">2021</span>
						<span className="year">2020</span>
						<span className="year">2019</span>
					</div>
				</div>
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
