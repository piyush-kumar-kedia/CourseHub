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
				<div>
					<i class="fa fa-search abs"></i>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
