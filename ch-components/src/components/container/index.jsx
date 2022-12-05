import "./styles.scss";
const Container = ({ children, color }) => {
	return (
		<div className={`container ${color}`}>
			<div className="container-content">{children}</div>
		</div>
	);
};

export default Container;
