import "./styles.scss";
import Button from "./Buttons";
export default function ContributionCard(props) {
  return (
    <div className="main_card">
      <div className="path">
        <p>12 June 2022 12:58 pm </p>
        <p>
          CL303 {">"} 2022 {">"} Lecture Slides
        </p>
      </div>
      <p className="content">{props.content}</p>
      <div className="btn">
        <Button text={props.text} />
      </div>
    </div>
  );
}
