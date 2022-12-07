import React from "react";
import "./styles.scss";
const SearchBar = ({ type }) => {
	return (
		<div class={`wrap ${type}`}>
			<div class="search">
				<input
					type="text"
					class="searchTerm"
					placeholder="Search Courses"
				/>
				<div className="search-img"></div>
			</div>
		</div>
	);
};

export default SearchBar;
