import "./styles.scss";
const ContributeButton = (props) => {
    return (
        <div className="contributebutton" onClick={props.contributionHandler}>
            Contribute to CourseHub
        </div>
    );
};

export default ContributeButton;
