import "./styles.scss";
import Logo from "./components/logo";
import NavLink from "../../../../components/navbar/components/navlink";
import SearchBar from "../../../../components/navbar/components/searchbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../../../actions/user_actions";
const NavBarBrowseScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(LogoutUser());
        window.location = "http://localhost:8080/api/auth/logout";
    };
    return (
        <nav className="nav-browse">
            <span onClick={() => navigate("/dashboard")}>
                <Logo />
            </span>
            {/* <SearchBar /> */}
            <div className="navlinks">
                <NavLink text={"Dashboard"} onClick={() => navigate("/dashboard")} />
                <NavLink text={"Profile"} onClick={() => navigate("/profile")} />
                <NavLink text={"Log Out"} onClick={handleLogout} />
            </div>
        </nav>
    );
};

export default NavBarBrowseScreen;
