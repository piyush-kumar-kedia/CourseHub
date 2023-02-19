import FrontBanner from "./components/FrontBanner";
import Contri_section from "./components/Contri_section";
import { Fragment } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import "./styles.scss";

const ProfilePage = () => {
    return (
        <Fragment>
            <div className={"main-wrapper"}>
                <div>
                    <NavBar />
                    <FrontBanner />
                    <Contri_section />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};
export default ProfilePage;
