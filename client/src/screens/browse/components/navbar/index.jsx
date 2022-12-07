import "./styles.scss";
import Logo from "./components/logo";
import NavLink from "../../../../components/navbar/components/navlink";
import SearchBar from "../../../../components/navbar/components/searchbar";
const NavBarBrowseScreen = () => {
	return (
		<nav className="nav-browse">
			<Logo />
			{/* <SearchBar /> */}
			<div className="navlinks">
				<NavLink text={"Dashboard"} />
				<NavLink text={"Profile"} />
				<NavLink text={"Log Out"} />
			</div>
		</nav>
	);
};

export default NavBarBrowseScreen;
