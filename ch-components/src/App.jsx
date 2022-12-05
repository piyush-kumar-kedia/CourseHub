import { useState } from "react";
import Dashboard from "./screens/dashboard";
import LandingPage from "./screens/landing";

const App = () => {
	const [clicked, setClicked] = useState(0);
	return !clicked ? <LandingPage setClicked={setClicked} /> : <Dashboard />;
};

export default App;
