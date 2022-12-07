import React from "react";
import "./styles.scss";
const NavLink = ({ text }) => {
	return <div className="nav-link">{text ? text : "no text"}</div>;
};

export default NavLink;
