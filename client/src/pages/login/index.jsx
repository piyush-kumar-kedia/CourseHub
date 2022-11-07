import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { LoginUser, LogoutUser } from "../../actions/userActions";
import axios from "axios";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
	const user = useSelector((state) => state.user);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const getAuth = async () => {
			try {
				const resp = await axios.get("/api/user");
				if (resp.data.error) {
					setLoading(false);
					dispatch(LogoutUser());
					return;
				}
				if (!resp.data) {
					setLoading(false);
					dispatch(LogoutUser());
					return;
				}
				setLoading(false);
				dispatch(LoginUser(resp.data));
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		getAuth();
	}, []);
	return user ? (
		<Navigate to="/" />
	) : loading ? (
		"loading..."
	) : (
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
	);
};

export default LoginPage;
