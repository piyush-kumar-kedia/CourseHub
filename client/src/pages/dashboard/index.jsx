import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import FileBrowser from "./components/filebrowser/FileBrowser";
import Display from "./components/display/Display";

import { ChangeCourse, EmptyCourse } from "../../actions/courseActions";
import { UpdateFiles, EmptyDisplay } from "../../actions/displayActions";

import "./index.scss";

const Dashboard = () => {
	const _course = useSelector((state) => state.course);
	const _display = useSelector((state) => state.display);
	const _user = useSelector((state) => state.user);

	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);

	const getMyCourses = async () => {
		try {
			const { data } = await axios.get("/loadcourses");
			setCourses(data.courses);
		} catch (error) {
			console.log(error);
		}
	};

	const dispatch = useDispatch();
	const getCourse = async (courseId) => {
		try {
			dispatch(EmptyDisplay());
			dispatch(EmptyCourse());
			const resp = await axios.get(`/course/${courseId}`);
			if (resp.data) {
				dispatch(
					ChangeCourse({
						courseId: courseId,
						data: resp.data.folders,
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getFolderData = async (folderId) => {
		try {
			dispatch(EmptyDisplay());
			setLoading(true);
			const resp = await axios.get(`/folder/${folderId}`);
			dispatch(UpdateFiles(resp.data.data));
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getMyCourses();
	}, []);

	return (
		<div className="main">
			<p>Welcome</p>
			<h3>{_user.name}</h3>
			<p>
				{_user.rollNumber} | {_user.branch}
			</p>
			<button
				className="m-b"
				onClick={() => {
					window.location = "http://localhost:8080/logout";
				}}
			>
				Logout
			</button>

			<h1 className="m-b">Dashboard</h1>
			<div className="course-container">
				{courses.map((course, idx) => (
					<div
						className="btn-primary m-b m-r"
						key={idx}
						onClick={() => getCourse(course.code)}
					>
						{course.code}
					</div>
				))}
			</div>
			<div className="content">
				<FileBrowser
					courseData={_course}
					getFolderData={getFolderData}
				/>
				<Display files={_display} loading={loading} />
			</div>
		</div>
	);
};

export default Dashboard;
