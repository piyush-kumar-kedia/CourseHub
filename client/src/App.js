import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const App = () => {
	const [user, setUser] = useState(null);
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
					<ul>
						<li>{user.rollNumber}</li>
						<li>{user.degree}</li>
					</ul>
				</>
			) : (
				"please login"
			)}
			<h3>Login</h3>
			<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c6c864ac-cced-4be6-8657-ca15170e7b51&response_type=code&redirect_uri=http://localhost:8080/login/redirect/&scope=offline_access%20user.read&state=12345&prompt=consent">
				Login with Outlook
			</a>
		</div>
	);
};

export default App;
