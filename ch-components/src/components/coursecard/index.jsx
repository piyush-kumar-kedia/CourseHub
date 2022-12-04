import "./styles.scss";
const CourseCard = ({ code, color, name, type }) => {
	return type === "ADD" ? (
		<div className="coursecard ADD">
			<div className="content">
				<i class="fa fa-xl fa-plus" aria-hidden="true"></i>
				<p>Add Course</p>
			</div>
		</div>
	) : (
		<div className="coursecard" style={{ backgroundColor: color }}>
			<p className="code">{code ? code : "code"}</p>
			<div className="name">
				<p>{name ? name : "name"}</p>
			</div>
		</div>
	);
};

export default CourseCard;
