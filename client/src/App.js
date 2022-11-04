import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
	const [user, setUser] = useState(null);
	const [courses, setCourses] = useState([]);

	const getMyCourses = async () => {
		try {
			const { data } = await axios.get("/loadcourses");
			setCourses(data.courses);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getAuth = async () => {
			try {
				const resp = await axios.get("/api/user");
				if (resp.data.error) {
					setUser(null);
					return;
				}
				if (!resp.data) {
					setUser(null);
					return;
				}
				setUser(resp.data);
			} catch (error) {
				console.log(error.response.data);
			}
		};
		getAuth();
	}, []);

	return (
		<div className="App">
			{user ? (
				<>
					<h1>{user.name}</h1>
					<button
						onClick={() => {
							window.location = "http://localhost:8080/logout";
						}}
					>
						Logout
					</button>
					<ul>
						<li>{user.rollNumber}</li>
						<li>{user.branch}</li>
						<li>{user.degree}</li>
					</ul>
					{courses.length === 0 && (
						<button onClick={getMyCourses}>Get courses</button>
					)}
					<ul>
						{courses.map((course, idx) => (
							<li key={idx}>
								{course.code} | {course.name}
							</li>
						))}
					</ul>
				</>
			) : (
				"please login"
			)}
			{!user && (
				<>
					<h3>Login</h3>
					<button
						onClick={() => {
							window.location =
								"https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c6c864ac-cced-4be6-8657-ca15170e7b51&response_type=code&redirect_uri=http://localhost:8080/login/redirect/&scope=offline_access%20user.read&state=12345&prompt=consent";
						}}
					>
						Login with Outlook
					</button>
				</>
			)}
		</div>
	);
};

export default App;
