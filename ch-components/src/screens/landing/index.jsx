import MicrosoftSignIn from "./components/microsoftbutton";
import SearchCourseButton from "./components/searchcoursebtn";
import "./styles.scss";
const LandingPage = ({ setClicked }) => {
	return (
		<section className="landing">
			<div className="top">
				<div className="right"></div>
			</div>
			<div className="bottom">
				<div className="content">
					<div className="text">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Massa odio nibh eu eu nulla ac vestibulum
							amet. Ultrices magna faucibus dui dignissim
							scelerisque. Lorem a sed egestas libero nisi. Vel
							mauris non sed fermentum.
						</p>
					</div>
					<div className="btn-container">
						<MicrosoftSignIn setClicked={setClicked} />
						<div className="line"></div>
						<SearchCourseButton />
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
