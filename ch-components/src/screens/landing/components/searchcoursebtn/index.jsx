import "./styles.scss";
const SearchCourseButton = () => {
	return (
		<div className="search-course-btn">
			<div className="search-icon"></div>
			<input type="text" placeholder="Enter Course Code" />
		</div>
	);
};

export default SearchCourseButton;
