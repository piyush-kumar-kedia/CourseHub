import "./styles.scss";
import Button from "./Buttons";
export default function ContributionCard(props) {
    const uploadDate = props.date;
    return (
        <div className="main_card">
            <div className="path">
                <p>{props.uploadDate}</p>
                <p>
                    {props.courseCode} {">"} {props.year} {">"} {props.section}
                </p>
            </div>
            <p className="content">{props.content}</p>
            <div className="btn">
                <Button text={props.isApproved} />
            </div>
        </div>
    );
}
