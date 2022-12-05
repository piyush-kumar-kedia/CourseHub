import "./styles.scss";

const FavouriteCard = ({ type = "file", color, path, name, subject }) => {
	return (
		<div className="fav-card">
			{type === "folder" ? (
				<svg
					width="200"
					height="175"
					viewBox="0 0 237 187"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.200195 186.4V0.400024H105.924L121.027 15.5034H197.857L212.96 0.400024H236.6V186.4H0.200195Z"
						fill={color ? color : "#7DDEFF"}
					/>
					<path
						d="M205.4 8.20007H114.2L121.4 16.0001H198.8L205.4 8.20007Z"
						fill="#EBEBEB"
					/>
				</svg>
			) : (
				<svg
					width="200"
					height="175"
					viewBox="0 0 238 187"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.800293 186.4V0.400024H200.6L237.2 37.2377V186.4H0.800293Z"
						fill={color ? color : "#F1F3DA"}
					/>
					<path
						d="M200.6 1L236.6 37H200.6V1Z"
						fill={"#CDCDCD"}
						fill-opacity="0.5"
					/>
					<line
						x1="18.2002"
						y1="65.8"
						x2="223.4"
						y2="65.8"
						stroke="black"
						stroke-opacity="0.25"
						stroke-width="1.2"
					/>
					<line
						x1="18.2002"
						y1="95.8"
						x2="223.4"
						y2="95.8"
						stroke="black"
						stroke-opacity="0.25"
						stroke-width="1.2"
					/>
					<line
						x1="18.2002"
						y1="123.4"
						x2="224.6"
						y2="123.4"
						stroke="black"
						stroke-opacity="0.25"
						stroke-width="1.2"
					/>
					<line
						x1="18.2002"
						y1="151"
						x2="224.6"
						y2="151"
						stroke="black"
						stroke-opacity="0.25"
						stroke-width="1.2"
					/>
					<line
						x1="18.2002"
						y1="178.6"
						x2="224.6"
						y2="178.6"
						stroke="black"
						stroke-opacity="0.25"
						stroke-width="1.2"
					/>
				</svg>
			)}
			<div className="content">
				<div className="top">
					<p className="path">{path ? path : "Path"}</p>
					<p className="name">{name ? name : "Name"}</p>
				</div>
				<div className="bottom">
					<p className="subject">
						{subject ? subject : "Subject Here"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default FavouriteCard;
