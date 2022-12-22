import "./styles.scss";
const CourseCard = ({ code, color, name, type, setClicked }) => {
    return type === "ADD" ? (
        <div className="coursecard ADD" onClick={setClicked}>
            <div className="content">
                <i className="fa fa-xl fa-plus" aria-hidden="true"></i>
                <p>Add Course</p>
            </div>
        </div>
    ) : (
        <div className="coursecard" style={{ backgroundColor: color }} onClick={setClicked}>
            <p className="code">{code ? code : "code"}</p>
            <div className="name">
                <p>{name ? name : "name"}</p>
            </div>
        </div>
    );
};

export default CourseCard;
