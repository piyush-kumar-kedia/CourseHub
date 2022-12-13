import FrontBanner from "./components/FrontBanner";
import Contri_section from "./components/Contri_section";
import { Fragment } from "react";
import NavBar from "../../components/navbar";
const ProfilePage = () => {
	return (
		<Fragment>
			<NavBar />
			<FrontBanner />
			<Contri_section />
		</Fragment>
	);
};
export default ProfilePage;
