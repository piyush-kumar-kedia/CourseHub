import React from "react";
import "./styles.scss";
const SubHeading = ({ text, type, color }) => {
	return <p className={`subheading ${type} ${color}`}>{text}</p>;
};

export default SubHeading;
