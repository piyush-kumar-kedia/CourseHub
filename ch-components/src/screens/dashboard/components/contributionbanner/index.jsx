import ContributeButton from "./components/button";
import "./styles.scss";
const ContributionBanner = () => {
	return (
		<div className="contributionbanner">
			<div className="content">
				<div className="left">
					<p className="title">Help your fellow mates!</p>
					<p className="para">
						Contribute files from your courses to CourseHub. blah
						blah blah blah blah blah blah blah blah blah
					</p>
				</div>
				<div className="middle"></div>
				<div className="right">
					<div className="upwings"></div>
					<ContributeButton />
					<div className="downwings"></div>
				</div>
			</div>
		</div>
	);
};

export default ContributionBanner;
