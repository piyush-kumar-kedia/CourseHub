import "./styles.scss";
import Button from "./Buttons";
import date from "date-and-time";
export default function ContributionCard(props) {
    const now = new Date(props.uploadDate);
    const pattern = date.compile(`DD MMM YYYY   hh:mm A`);
    const finalDate = date.format(now, pattern);
    return (
        <div className="main_card">
            <div className="path">
                <p>{finalDate}</p>
                <p>
                    {props.courseCode}
                </p>
            </div>
            <p className="content">{props.content}</p>
            <div className="btn">
                <Button text={props.isApproved === true ? "APPROVED" : "PENDING"} />
            </div>
        </div>
    );
}
