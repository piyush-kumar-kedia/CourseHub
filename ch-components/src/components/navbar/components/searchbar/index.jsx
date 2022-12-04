import React from "react";
import "./styles.scss";
const SearchBar = () => {
	return (
		<div class="wrap">
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
