import { useState } from "react";
import BrowseScreen from "./screens/browse";
import Dashboard from "./screens/dashboard";
import LandingPage from "./screens/landing";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./router_utils/PrivateRoutes";
import ProfilePage from "./screens/profile.js";
const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route element={<BrowseScreen />} path="/browse" exact />
						<Route element={<Dashboard />} path="/dashboard" exact />
						<Route element={<ProfilePage />} path="/profile" exact />
					</Route>
					<Route element={<LandingPage />} path="/" />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
