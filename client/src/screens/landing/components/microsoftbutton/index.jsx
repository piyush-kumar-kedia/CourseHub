import "./styles.scss";
const MicrosoftSignIn = ({ setClicked }) => {
	return (
		<div className="microsoft-signin-btn" onClick={setClicked}>
			{/* <i class="fa-brands fa-microsoft fa-xl"></i> */}
			<div className="logo"></div>
			<span>Sign in with Microsoft</span>
		</div>
	);
};

export default MicrosoftSignIn;
