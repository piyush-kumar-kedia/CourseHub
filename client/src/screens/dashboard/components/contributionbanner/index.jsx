import ContributeButton from "./components/button";
import "./styles.scss";
const ContributionBanner = (props) => {
    return (
        <div className="contributionbanner">
            <div className="content">
                <div className="left">
                    <p className="title">Help your fellow mates!</p>
                    <p className="para">
                        By sharing your notes, past papers, and other resources, you'll not only be
                        helping others succeed, but you'll also get recognition for your hard work –
                        we'll feature your name alongside the files you contribute.
                    </p>
                </div>
                <div className="middle"></div>
                <div className="right">
                    <div className="upwings"></div>
                    <ContributeButton contributionHandler={props.contributionHandler} />
                    <div className="downwings"></div>
                </div>
            </div>
        </div>
    );
};

export default ContributionBanner;
