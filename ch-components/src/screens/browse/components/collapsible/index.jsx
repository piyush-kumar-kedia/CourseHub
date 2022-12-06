import { useState } from "react";
import Folder from "./components/folder";
import FolderController from "./components/folder-controller";
import "./styles.scss";
const Collapsible = ({ color, state }) => {
	const [open, setOpen] = useState(state ? state : false);
	const onClick = () => {
		setOpen(!open);
	};
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
				<FolderController
					folders={[
						{
							name: "Slides2",
							childType: "File",
							children: [
								{
									name: "Slide12",
								},
								{
									name: "Slide22",
								},
							],
						},
						{
							name: "Tutorial",
							childType: "Folder",
							children: [
								{
									name: "Questions",
									childType: "File",
									children: [
										{
											name: "t1",
										},
										{
											name: "t2",
										},
										{
											name: "t3",
										},
									],
								},
								{
									name: "Answers",
									childType: "File",
									children: [
										{
											name: "a1",
										},
										{
											name: "a2",
										},
										{
											name: "a3",
										},
									],
								},
							],
						},
						{
							name: "Slides",
							childType: "File",
							children: [
								{
									name: "Slide1",
								},
								{
									name: "Slide2",
								},
							],
						},
					]}
				/>
			</div>
		</div>
	);
};

export default Collapsible;
