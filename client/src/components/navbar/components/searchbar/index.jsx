import React from "react";
import "./styles.scss";
const SearchBar = ({ type }) => {
	return (
		<div className={`wrap ${type}`}>
			<div className="search">
				<input
					type="text"
					className="searchTerm"
					placeholder="Search Courses"
				/>
				<div className="search-img"></div>
			</div>
		</div>
	);
};

export default SearchBar;
