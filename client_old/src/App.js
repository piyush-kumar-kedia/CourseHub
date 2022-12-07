import axios from "axios";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import "./App.scss";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

axios.defaults.withCredentials = true;

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route element={<Dashboard />} path="/" exact />
					</Route>
					<Route element={<LoginPage />} path="/login" exact />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
