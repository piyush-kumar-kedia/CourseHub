import { useState } from "react";
import BrowseScreen from "./screens/browse";
import Dashboard from "./screens/dashboard";
import LandingPage from "./screens/landing";

const App = () => {
	const [clicked, setClickedInt] = useState(0);
	const setClicked = () => {
		setClickedInt(clicked + 1);
	};
	return clicked === 0 ? (
		<LandingPage setClicked={setClicked} />
	) : clicked === 1 ? (
		<Dashboard setClicked={setClicked} />
	) : (
		<BrowseScreen />
	);
	// return <BrowseScreen />;
};

export default App;
