import { useState } from "react";
import Folder from "./components/folder";
import FolderController from "./components/folder-controller";
import "./styles.scss";
import axios, { all } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { UpdateCourses } from "../../../../actions/filebrowser_actions";
import { LoadCourses } from "../../../../actions/filebrowser_actions";
import { ChangeFolder } from "../../../../actions/filebrowser_actions";
const Collapsible = ({ course, color, state }) => {
	const [open, setOpen] = useState(state ? state : false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState(null);

	const triggerGetCourse = () => {
		const run = async () => {
			const t = await getCurrentCourse(course.code);
			if (t) {
				setData(t.children);
				dispatch(ChangeFolder(t));
				console.log(t);
			}
		};
		run();
	};

	const onClick = () => {
		setOpen(!open);
	};

	const dispatch = useDispatch();

	const allCourseData = useSelector(
		(state) => state.fileBrowser.allCourseData
	);

	const getCurrentCourse = async (code) => {
		let currCourse = null;
		try {
			currCourse = allCourseData.find((course) => course.code === code);
		} catch (error) {
			localStorage.removeItem("AllCourses");
			location.reload();
		}
		if (currCourse) console.log("Already present...");
		if (!currCourse) {
			try {
				currCourse = await axios.get(
					`http://localhost:8080/course/${code}`
				);
				let temp = currCourse;
				currCourse = temp.data;
			} catch (error) {
				setLoading(false);
				setError(true);
				return null;
			}
			if (!allCourseData.find((course) => course.code === code)) {
				dispatch(UpdateCourses(currCourse));
			}
		}
		setLoading(false);
		return currCourse;
	};

	return (
		<div className={`collapsible ${open}`}>
			<div className="main" onClick={onClick}>
				<div
					className="color"
					style={{ backgroundColor: color ? color : "#6F8FFE" }}
				></div>
				<div className="content" onClick={triggerGetCourse}>
					<div className="text">
						<p className="code">
							{course.code ? course.code.toUpperCase() : "CL 301"}
						</p>
						<p className="name">
							{course.name
								? course.name
								: "Process Control and Instrumentation"}
						</p>
					</div>
					<div className="arrow"></div>
				</div>
			</div>
			<div className="collapsible-content">
				{!loading && !error ? (
					<FolderController folders={data} />
				) : loading ? (
					"Loading Course Data, please wait..."
				) : (
					"error"
				)}
			</div>
		</div>
	);
};

export default Collapsible;
