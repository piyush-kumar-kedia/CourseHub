import "./styles.scss";
const SearchCourseButton = ({ searchCourseShowModalHandler }) => {
    return (
        <form
            className="search-course-btn"
            onSubmit={(e) => {
                e.preventDefault();
                if (!e.target[0].value) return;
                window.location = "/browse/" + e.target[0].value;
            }}
            onClick={searchCourseShowModalHandler}
        >
            <div className="search-icon"></div>
            <input disabled type="text" placeholder="Enter Course Code" />
        </form>
    );
};

export default SearchCourseButton;
