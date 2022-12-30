import "./styles.scss";
const SearchCourseButton = () => {
    return (
        <form
            className="search-course-btn"
            onSubmit={(e) => {
                e.preventDefault();
                if (!e.target[0].value) return;
                window.location = "/browse/" + e.target[0].value;
            }}
        >
            <div className="search-icon"></div>
            <input type="text" placeholder="Enter Course Code" />
        </form>
    );
};

export default SearchCourseButton;
