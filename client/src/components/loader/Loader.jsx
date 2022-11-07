import React from "react";
import "./Loader.scss";
const Loader = () => {
	return (
		<div className="center">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
