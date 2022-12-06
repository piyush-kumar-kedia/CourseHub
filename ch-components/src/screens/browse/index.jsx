import "./styles.scss";
import Container from "../../components/container";
import Collapsible from "./components/collapsible";
import Navbar from "../../components/navbar";
import FolderInfo from "./components/folder-info";
import FileDisplay from "./components/file-display";
const BrowseScreen = () => {
	return (
		<Container color={"light"} type={"fluid"}>
			<div className="navbar-browse-screen">NAVBAR 10vh</div>
			<div className="controller">
				<div className="left">
					<Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#FFA7D4"} state={true} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} />
					<Collapsible color={"#6F8FFE"} />
					<Collapsible color={"#EDF492"} />
					<Collapsible color={"#7DDEFF"} />
				</div>
				<div className="middle">
					<FolderInfo
						path={"Home > CL 303 > Exams"}
						name={"Mid-Sem"}
					/>
					<div className="files">
						<FileDisplay />
						<FileDisplay />
						<FileDisplay />
						<FileDisplay />
						<FileDisplay />
						<FileDisplay />
					</div>
				</div>
				<div className="right">right display</div>
			</div>
		</Container>
	);
};

export default BrowseScreen;
