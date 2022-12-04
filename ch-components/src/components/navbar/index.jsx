import React from "react";
import "./styles.scss";
import Logo from "./components/logo";
import NavLink from "./components/navlink";
import SearchBar from "./components/searchbar";

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="nav-content">
				<Logo />
				<SearchBar />
				<div className="navlinks">
					<NavLink text={"Dashboard"} />
					<NavLink text={"Profile"} />
					<NavLink text={"Log Out"} />
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
