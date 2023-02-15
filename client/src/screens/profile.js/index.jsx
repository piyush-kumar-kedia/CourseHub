import FrontBanner from "./components/FrontBanner";
import Contri_section from "./components/Contri_section";
import { Fragment } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
const ProfilePage = () => {
    return (
        <Fragment>
            <NavBar />
            <FrontBanner />
            <Contri_section />
            <Footer />
        </Fragment>
    );
};
export default ProfilePage;
